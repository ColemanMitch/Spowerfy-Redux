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
import styled from 'styled-components';

export const AppTitleNonFixed = styled.h1`
  text-align: center;
`;

export const AppBody = styled.div`
  padding-top: 65px;
  background: linear-gradient(-45deg, #e4b4a4, #e9bbcd, #77c0b0, #7db6aa);
  background-size: 400% 400%;
  -webkit-animation: gradient 15s ease infinite;
  animation: gradient 15s ease infinite;
  display: flex !important;
  flex-direction: column;
  justify-content: center !important;
`

const PartyTime = styled(AppBody)`
  padding-top: 0 !important;
  display: block;
  text-align: center;
`;

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
      numberOfSongs: 60
    }
    this.spotifyService = new SpotifyService();
    
    this.startPlayback = this.startPlayback.bind(this);
    this.fetchCurrentlyPlaying = this.fetchCurrentlyPlaying.bind(this);
    this.skipToNextSong = this.skipToNextSong.bind(this);
    this.changeInterval = this.changeInterval.bind(this);
    this.changeNumberOfSongs = this.changeNumberOfSongs.bind(this);
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
            devices: json.devices
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

  handleDevice = (e): void => {
    // Trying to type this parameter is absolutely ridiculous, leaving as any
    this.setState({playbackDeviceId: e.value});
  }

  setPlaylist = (playlist: Playlist): void => {
    this.setState({activePlaylist: playlist});
  }

  startPlayback(): void {
    if (!this.state.playbackDeviceId || !this.state.activePlaylist) {
      alert('Select both a device and a playlist to get this party started!');
    } else {
      this.spotifyService.useDevice(this.state.playbackDeviceId).then(res => {
        if (res.status === 204) {
          setTimeout(() => this.spotifyService.startPlaylist(this.state.activePlaylist?.uri ?? '').then(() => {
            // TODO: Fix using timeout here
            this.spotifyService.shuffle().then(() => {
              this.setState({
                partyStarted: true
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

  changeInterval(e) {
    const newVal = forceNumber(e.target.value);
    this.setState({interval: newVal});
  }

  changeNumberOfSongs(e) {
    const newVal = forceNumber(e.target.value);
    this.setState({numberOfSongs: newVal});
  }

  render() {
    return (
      <div className="App">
        { this.state.partyStarted ?
          <PartyTime className="app-body">
            <header>
              <AppTitleNonFixed>Spowerfy 🍺</AppTitleNonFixed>
            </header>
            <h2>Currently Playing: </h2>
            <Timer skipToNextSong={this.skipToNextSong} interval={this.state.interval} numberOfSongs={this.state.numberOfSongs}></Timer>
              { this.state.activeSong ?
                <div>
                  <img src={this.state.activeSong.album.images[0].url} alt='album art of the current track'></img>
                  <h3 style={{fontWeight: 'bold'}}>{this.state.activeSong.name}</h3>
                  <h4 style={{paddingBottom: '5%'}}>{this.state.activeSong.album.artists[0].name}</h4> 
                  <div>
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
          <div>
            { this.state.user ?
              <SelectMusicPage 
                devices={this.state.devices} 
                playlists={this.state.playlists}
                user={this.state.user}
                activePlaylist={this.state.activePlaylist}
                setPlaylist={this.setPlaylist} 
                handleDevice={this.handleDevice}
                startPlayback={this.startPlayback}
                changeNumberOfSongs={this.changeNumberOfSongs}
                numberOfSongs={this.state.numberOfSongs}
              />
            : 
              <Login />
            }
          </div>
        }
        <footer>
          <p>Made by <a href="https://www.github.com/ColemanMitch" >Cole Mitchell</a> & <a href="https://github.com/dwilliams27" >David Williams</a></p>
        </footer>
    </div>
    );
  }
}

export default App;