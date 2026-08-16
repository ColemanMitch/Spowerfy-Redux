import './styles/main.css';
import { useEffect, useMemo, useState } from 'react';
import { Device, Playlist, Song, User } from './models/models';
import { MeResponse, DevicesResponse, PlaylistsResponse, CurrentlyPlayingReponse } from './models/responses';
import { SpotifyService } from './services/spotify.service';
import Timer from './Timer';
import Login from './components/Login';
import SelectMusicPage from './components/SelectMusicPage';
import {RangeStepInput} from 'react-range-step-input';
import forceNumber from 'force-number';
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
import { ArrowBackIos } from '@material-ui/icons';
import {
  AppTitleNonFixed,
  AppContainer,
  PartyTime,
  AlbumArt } from './styles/App.style';
import partyOverImage from "./images/partyOver.jpg";

const App = () => {
  const spotifyService = useMemo(() => new SpotifyService(), []);

  const [user, setUser] = useState<User>();
  const [playbackDeviceId, setPlaybackDeviceId] = useState('');
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [activePlaylist, setActivePlaylist] = useState<Playlist>();
  const [activeSong, setActiveSong] = useState<Song>();
  const [partyStarted, setPartyStarted] = useState(false);
  const [partyOver, setPartyOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [songInterval, setSongInterval] = useState(10);
  const [numberOfSongs, setNumberOfSongs] = useState(60);

  useEffect(() => {
    spotifyService.fetchMe().then(data => {
      data.json().then((json: MeResponse) => {
        if(json.display_name) {
          setUser({ name: json.display_name });
        }
      });
    });

    spotifyService.fetchDevices().then(data => {
      data.json().then((json: DevicesResponse) => {
        if(json.devices) {
          setDevices(json.devices);
        }
      })
    });

    spotifyService.fetchPlaylists().then(data => {
      data.json().then((json: PlaylistsResponse) => {
        if(json.items) {
          setPlaylists(json.items);
        }
      });
    });
  }, [spotifyService]);

  const loadDevices = (): void => {
    spotifyService.fetchDevices().then(data => {
      data.json().then((json: DevicesResponse) => {
        if(json.devices) {
          setDevices(json.devices);
        }
      })
    });
  }

  const handleDevice = (e): void => {
    // Trying to type this parameter is absolutely ridiculous, leaving as any
    setPlaybackDeviceId(e.value);
  }

  const fetchCurrentlyPlaying = (): void => {
    spotifyService.fetchCurrentlyPlaying().then(data => {
      data.json().then((json: CurrentlyPlayingReponse) => {
        if(json.item) {
          setActiveSong(json.item);
        }
      });
    });
  }

  const startPlayback = (playlist: Playlist): void => {
    if (!playbackDeviceId) {
      alert('Select both a device and a playlist to get this party started!');
    } else {
      spotifyService.useDevice(playbackDeviceId).then(res => {
        if (res.status === 204) {
          setTimeout(() => spotifyService.startPlaylist(playlist?.uri ?? '').then(() => {
            // TODO: Fix using timeout here
            spotifyService.shuffle().then(() => {
              setPartyStarted(true);
              setActivePlaylist(playlist);
              setPaused(false);
              setTimeout(() => fetchCurrentlyPlaying(), 1000);
              // Sometimes currently playing fro spotify doesnt update for a bit
              setTimeout(() => fetchCurrentlyPlaying(), 2500);
            });
          }), 1000);
        }
      });
    }
  }

  const skipToNextSong = (): void => {
    // Wait for skip song call to finish, then read the body
    spotifyService.skipSong().then(res => {
      res.body?.getReader().read().then(body => {
        if(body?.done) {
          // Refresh currently playing since we know new song is now playing
          setTimeout(() => fetchCurrentlyPlaying(), 1000);
        }
      });
    });
  }

  const pauseCurrentPlayback = (): void => {
    setPaused(true);
    spotifyService.pauseCurrentPlayback().then(res => {
      res.body?.getReader().read().then(body => {
        if(body?.done) {
          // Refresh currently playing since we know new song is now playing
          setTimeout(() => fetchCurrentlyPlaying(), 1000);
        }
      });
    });
  }

  const resumeCurrentPlayback = (): void => {
    setPaused(false);
    spotifyService.resumeCurrentPlayback().then(res => {
      res.body?.getReader().read().then(body => {
        if(body?.done) {
          setTimeout(() => fetchCurrentlyPlaying(), 1000);
        }
      });
    });
  }

  const endParty = (): void => {
    setPartyOver(true);
  }

  const changeInterval = (e): void => {
    setSongInterval(forceNumber(e.target.value));
  }

  const changeNumberOfSongs = (e): void => {
    setNumberOfSongs(forceNumber(e.target.value));
  }

  const goBack = (): void => {
    pauseCurrentPlayback();
    setPartyStarted(false);
  }

  return (
    <AppContainer className="App">
      { partyStarted ?
        <PartyTime className="app-body">
          <header>
          { activeSong ? <ArrowBackIos onClick={() => goBack()} style={{ float: 'left', cursor: 'pointer', color: 'white', marginTop: "1rem", marginLeft: "1rem"}}/> : "hi"}
            <AppTitleNonFixed>Spowerfy 🍺</AppTitleNonFixed>
          </header>
          <h2>Currently Playing: </h2>
          <Timer paused={paused} skipToNextSong={skipToNextSong} partyOver={endParty} interval={songInterval} numberOfSongs={numberOfSongs}></Timer>
          { activeSong ?
              <div style={{height: "100%"}}>
                <AlbumArt src={!partyOver ? activeSong.album.images[0].url : partyOverImage } alt='album art of the current track'></AlbumArt>
                <h3 style={{fontWeight: 'bold'}}>{!partyOver ? activeSong.name : ""}</h3>
                <h4 style={{paddingBottom: '5%'}}>{!partyOver ? activeSong.album.artists[0].name: ""}</h4>
                <div>
                { !paused ?
                <Pause style={{cursor: "pointer"}} onClick={pauseCurrentPlayback}/>
              :
                <PlayArrow style={{cursor: "pointer"}} onClick={resumeCurrentPlayback}/>
              }
                  <p>Change the interval between songs?</p>
                  <RangeStepInput
                  min={5} max={120} onChange={changeInterval}
                  value={songInterval} step={5}/>
                  {songInterval} seconds
              </div>
            </div>
          :
            <p>Loading playback..</p>
          }
        </PartyTime>
      :
        <div style={{height: "100%"}}>
          { user ?
            <SelectMusicPage
              devices={devices}
              playlists={playlists}
              user={user}
              activePlaylist={activePlaylist}
              handleDevice={handleDevice}
              startPlayback={startPlayback}
              changeNumberOfSongs={changeNumberOfSongs}
              reloadDevices={loadDevices}
              numberOfSongs={numberOfSongs}
              playbackDeviceId={playbackDeviceId}
            />
          :
            <Login />
          }
        </div>
      }
      <footer>
        <p>Made by <a href="https://www.github.com/ColemanMitch" >Cole Mitchell</a> & <a href="https://github.com/dwilliams27" >David Williams</a></p>
      </footer>
  </AppContainer>
  );
}

export default App;
