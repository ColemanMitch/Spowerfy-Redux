import './App.css';
import { Component, SyntheticEvent } from 'react';
import Select from 'react-select';
import { AppState } from './models/models';
import { MeResponse, DevicesResponse, PlaylistsResponse, CurrentlyPlayingReponse, SpotifyReponse } from './models/responses';
import { SpotifyService } from './services/spotify.service';
import Timer from './Timer';
import { LOGIN_URL, LOGIN_URL_LOCAL } from './config/constants';

class App extends Component<void, AppState> {
  private spotifyService: SpotifyService;

  state: AppState;

  constructor(props: void) {
    super(props);
    this.state = {
      authenticated: false,
      filterString: '',
      playbackDeviceId: '',
      playlistURI: '',
      playlists: [],
      filteredPlaylists: [],
      playlistFilter: '',
      partyStarted: false,
      devices: [],
      songLoaded: false
    }
    this.spotifyService = new SpotifyService();
    
    this.startPlayback = this.startPlayback.bind(this);
    this.fetchCurrentlyPlaying = this.fetchCurrentlyPlaying.bind(this);
    this.skipToNextSong = this.skipToNextSong.bind(this)
  }

  componentDidMount(): void {      
    this.spotifyService.fetchMe().then(data => {
      data.json().then((json: MeResponse) => {
        this.logIfError(json);
        if(json.display_name) {
          this.setState({
            user: { name: json.display_name }
          })
        }
      });
    });

    this.spotifyService.fetchDevices().then(data => {
      data.json().then((json: DevicesResponse) => {
        this.logIfError(json);
        if(json.devices) {
          this.setState({
            devices: json.devices
          })
        }
      })
    });

    this.spotifyService.fetchPlaylists().then(data => {
      data.json().then((json: PlaylistsResponse) => {
        this.logIfError(json);
        if(json.items) {
          this.setState({
            playlists: json.items,
            filteredPlaylists: json.items
          });
        }
      });
    });
  }

  logIfError(response: SpotifyReponse): void {
    if(response.error) {
      console.error(`ERROR: ${response.error.status} : ${response.error.message}`);
    }
  }

  handleDevice = (e): void => {
    this.setState({playbackDeviceId: e.value})
  }

  handlePlaylist = (e: SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    this.setState({playlistURI: target.value})
  }

  filterPlaylist = (e: SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    this.setState({
      filteredPlaylists: this.state.playlists.filter((playlist) => playlist.name.toLowerCase().includes(target.value.toLowerCase())),
      playlistFilter: target.value
    });
  }

  startPlayback(): void {
    if (!this.state.playbackDeviceId || !this.state.playlistURI) {
      alert('Select both a device and a playlist to get this party started!');
    } else {
      this.spotifyService.useDevice(this.state.playbackDeviceId).then(res => {
        if (res.status === 204) {
          this.spotifyService.startPlaylist(this.state.playlistURI).then(() => {
            this.spotifyService.shuffle().then(() => {
              this.setState({
                partyStarted: true
              });
              setTimeout(() => this.fetchCurrentlyPlaying(), 1000);
            });
          });
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
      })
    })
  }

  skipToNextSong(): void {
    // Wait for skip song call to finish, then read the body
    this.spotifyService.skipSong().then(res => {
      res.body?.getReader().read().then(body => {
        if(body?.done) {
          // Refresh currently playing since we know new song is now playing
          this.fetchCurrentlyPlaying();
        }
      })
    })
  }

  render() {
    return (
      <div className="App">
        { this.state.partyStarted ?
          <div className="party-time app-body">
            <header className="nonfixed-header">
            <h1 className="app-title-nonfixed">Spowerfy 🍺</h1>
            </header>
            <h2>Currently Playing: </h2>
            <Timer skipToNextSong={this.skipToNextSong}></Timer>
              { this.state.activeSong ?
                <div>
                  <img src={this.state.activeSong.album.images[0].url} alt='album art of the current track'></img>
                  <h3 style={{fontWeight: 'bold'}}>{this.state.activeSong.name}</h3>
                  <h4 className="artist-name">{this.state.activeSong.album.artists[0].name}</h4> 
                </div>
              :
                <p>Loading playback..</p>
              }
          </div>
        :
          <div>
            { this.state.user ?
              <div>
                <header className="fixed-header">
                  <h1 className="app-title">Spowerfy 🍺</h1>  
                  <button className="start-button" style={{float:"right"}} onClick={this.startPlayback}>Click to start your power hour</button>
                </header>
                <div className="app-body">
                  <h2>Hello {this.state.user.name},</h2>
                  <br></br>
                  { this.state.devices ?
                  <ul>
                    <h3>Select your playback device</h3>
                    <Select id="playback-device-select"
                      options={this.state.devices.map(device => ({ label: device.name, value: device.id }))}
                      onChange={this.handleDevice} 
                    />
                  </ul>
                  :
                  <p>Loading devices...</p>
                  }
                  <input id="playlist-filter" placeholder="Start typing to filter for your playlist" onChange={ this.filterPlaylist } value={ this.state.playlistFilter }/>
                  { this.state.filteredPlaylists && this.state.filteredPlaylists.length > 0 ?
                    <div>
                      <div className="playlist-container">
                        <ul>
                        <form id="playlist-select">
                        { this.state.filteredPlaylists.map((pl) => (
                          <div className="playlist-div">
                            <img className="playlist-images" src={pl.images[0]?.url} alt="Playlist art"></img>
                            <li className="playlist-name">
                              <h3 className="playlist-name-h3">{pl.name}</h3>
                              <input type="radio" value={pl.uri} name="playlists" onClick={this.handlePlaylist}/>
                            </li>
                          </div>
                        ))}
                        </form>
                        </ul>
                      </div>
                    </div>
                  : 
                    <p>Loading playlists...</p>
                  }
                <hr></hr>
              </div>
            </div>
          : 
            <div className="login-app-body">
              <header className="nonfixed-header">
                <h1 className="app-title-nonfixed">Spowerfy 🍺</h1>
              </header>
              <button id="sign-in-button" className="center" onClick={() => {
                  window.location.assign(window.location.href.includes('localhost') 
                  ? LOGIN_URL_LOCAL 
                  : LOGIN_URL) 
                }
              }
              style={{'fontSize': '20px'}}>Sign in with Spotify</button>
            </div>
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