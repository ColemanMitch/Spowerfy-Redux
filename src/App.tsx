import './styles/main.css';
import { Component } from 'react';
import { AppState, Playlist } from './models/models';
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
import partyOver from "./images/partyOver.jpg";
class App extends Component<void, AppState> {
  private spotifyService: SpotifyService;

  state: AppState;

  constructor(props: void) {
    super(props);
    this.state = {
      authenticated: false,
      filterString: '',
      playbackDeviceId: '',
      playlists: [],
      filteredPlaylists: [],
      partyStarted: false,
      devices: [],
      songLoaded: false,
      interval: 10,
      numberOfSongs: 60,
      paused: false,
      loadingDevices: true,
      partyOver: false
    }
    this.spotifyService = new SpotifyService();
    
    this.startPlayback = this.startPlayback.bind(this);
    this.fetchCurrentlyPlaying = this.fetchCurrentlyPlaying.bind(this);
    this.skipToNextSong = this.skipToNextSong.bind(this);
    this.changeInterval = this.changeInterval.bind(this);
    this.changeNumberOfSongs = this.changeNumberOfSongs.bind(this);
    this.pauseCurrentPlayback = this.pauseCurrentPlayback.bind(this);
    this.resumeCurrentPlayback = this.resumeCurrentPlayback.bind(this);
    this.loadDevices = this.loadDevices.bind(this);
    this.goBack = this.goBack.bind(this);
    this.partyOver = this.partyOver.bind(this);
  }

  componentDidMount(): void {      
    this.spotifyService.fetchMe().then(data => {
      data.json().then((json: MeResponse) => {
        if(json.display_name) {
          this.setState({
            user: { name: json.display_name }
          });
        }
      });
    });

    this.spotifyService.fetchDevices().then(data => {
      data.json().then((json: DevicesResponse) => {
        if(json.devices) {
          this.setState({
            devices: json.devices,
            loadingDevices: false
          });
        }
      })
    });

    this.spotifyService.fetchPlaylists().then(data => {
      data.json().then((json: PlaylistsResponse) => {
        if(json.items) {
          this.setState({
            playlists: json.items,
            filteredPlaylists: json.items
          });
        }
      });
    });
  }

  loadDevices(): void {
    this.setState({
      loadingDevices: true
    });
    this.spotifyService.fetchDevices().then(data => {
      data.json().then((json: DevicesResponse) => {
        if(json.devices) {
          this.setState({
            devices: json.devices,
            loadingDevices: false
          });
        }
      })
    });
  }

  handleDevice = (e): void => {
    // Trying to type this parameter is absolutely ridiculous, leaving as any
    this.setState({playbackDeviceId: e.value});
  }

  startPlayback(playlist: Playlist): void {
    if (!this.state.playbackDeviceId) {
      alert('Select both a device and a playlist to get this party started!');
    } else {
      this.spotifyService.useDevice(this.state.playbackDeviceId).then(res => {
        if (res.status === 204) {
          setTimeout(() => this.spotifyService.startPlaylist(playlist?.uri ?? '').then(() => {
            // TODO: Fix using timeout here
            this.spotifyService.shuffle().then(() => {
              this.setState({
                partyStarted: true,
                activePlaylist: playlist,
                paused: false
              });
              setTimeout(() => this.fetchCurrentlyPlaying(), 1000);
              // Sometimes currently playing fro spotify doesnt update for a bit
              setTimeout(() => this.fetchCurrentlyPlaying(), 2500);
            });
          }), 1000);
        }
      });
    }
  }


  fetchCurrentlyPlaying() {
    this.spotifyService.fetchCurrentlyPlaying().then(data => {
      data.json().then((json: CurrentlyPlayingReponse) => {
        if(json.item) {
          this.setState({
            activeSong: json.item
          });
        }
      });
    });
  }

  skipToNextSong(): void {
    // Wait for skip song call to finish, then read the body
    this.spotifyService.skipSong().then(res => {
      res.body?.getReader().read().then(body => {
        if(body?.done) {
          // Refresh currently playing since we know new song is now playing
          setTimeout(() => this.fetchCurrentlyPlaying(), 1000);
        }
      });
    });
  }

  pauseCurrentPlayback(): void {
    this.setState({
      paused: true,
    })
    this.spotifyService.pauseCurrentPlayback().then(res => {
      res.body?.getReader().read().then(body => {
        if(body?.done) {
          // Refresh currently playing since we know new song is now playing
          setTimeout(() => this.fetchCurrentlyPlaying(), 1000);
        }
      });
    });
  }

  resumeCurrentPlayback(): void {
    this.setState({
      paused: false,
    })
    this.spotifyService.resumeCurrentPlayback().then(res => {
      res.body?.getReader().read().then(body => {
        if(body?.done) {
          setTimeout(() => this.fetchCurrentlyPlaying(), 1000);
        }
      });
    });
  }

  partyOver(): void {
    this.setState({
      partyOver: true,
    })
  }

  changeInterval(e) {
    const newVal = forceNumber(e.target.value);
    this.setState({interval: newVal});
  }

  changeNumberOfSongs(e) {
    const newVal = forceNumber(e.target.value);
    this.setState({numberOfSongs: newVal});
  }

  goBack(): void {
    this.pauseCurrentPlayback();
    this.setState({
      partyStarted: false,
    })
  }

  render() {
    return (
      <AppContainer className="App">
        { this.state.partyStarted ?
          <PartyTime className="app-body">
            <header>
            { this.state.activeSong ? <ArrowBackIos onClick={() => this.goBack()} style={{ float: 'left', cursor: 'pointer', color: 'white', marginTop: "1rem", marginLeft: "1rem"}}/> : "hi"}
              <AppTitleNonFixed>Spowerfy 🍺</AppTitleNonFixed>
            </header>
            <h2>Currently Playing: </h2>
            <Timer paused={this.state.paused} skipToNextSong={this.skipToNextSong} partyOver={this.partyOver} interval={this.state.interval} numberOfSongs={this.state.numberOfSongs}></Timer>
            { this.state.activeSong ?
                <div style={{height: "100%"}}>
                  <AlbumArt src={!this.state.partyOver ? this.state.activeSong.album.images[0].url : partyOver } alt='album art of the current track'></AlbumArt>
                  <h3 style={{fontWeight: 'bold'}}>{!this.state.partyOver ? this.state.activeSong.name : ""}</h3>
                  <h4 style={{paddingBottom: '5%'}}>{!this.state.partyOver ? this.state.activeSong.album.artists[0].name: ""}</h4> 
                  <div>
                  { !this.state.paused ?
                  <Pause style={{cursor: "pointer"}} onClick={this.pauseCurrentPlayback}/>
                :
                  <PlayArrow style={{cursor: "pointer"}} onClick={this.resumeCurrentPlayback}/>
                } 
                    <p>Change the interval between songs?</p> 
                    <RangeStepInput
                    min={5} max={120} onChange={this.changeInterval}
                    value={this.state.interval} step={5}/>
                    {this.state.interval} seconds 
                </div>
              </div>
            :
              <p>Loading playback..</p>
            }
          </PartyTime>
        :
          <div style={{height: "100%"}}>
            { this.state.user ?
              <SelectMusicPage 
                devices={this.state.devices} 
                playlists={this.state.playlists}
                user={this.state.user}
                activePlaylist={this.state.activePlaylist}
                handleDevice={this.handleDevice}
                startPlayback={this.startPlayback}
                changeNumberOfSongs={this.changeNumberOfSongs}
                reloadDevices={this.loadDevices}
                numberOfSongs={this.state.numberOfSongs}
                playbackDeviceId={this.state.playbackDeviceId}
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
}

export default App;