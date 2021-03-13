import React, { Component } from 'react';
import './App.css';
import { AppState } from './models/models';
import { MeResponse, DevicesResponse, PlaylistsResponse, CurrentlyPlayingReponse, SpotifyReponse } from './models/responses';
import { SpotifyService } from './services/spotify.service';
import Timer from './Timer';

class App extends Component<{}, AppState> {
  private spotifyService: SpotifyService;

  state: AppState;

  constructor(props: {}) {
    super(props);
    this.state = {
      authenticated: false,
      filterString: '',
      playbackDeviceId: '',
      playlistURI: '',
      playlists: [],
      partyStarted: false,
      devices: [],
    }
    this.spotifyService = new SpotifyService();
    
    this.startPlayback = this.startPlayback.bind(this);
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.skipToNextSong = this.skipToNextSong.bind(this)
  }

  async componentDidMount() {      
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
            playlists: json.items
          });
        }
      });
    });
  }

  logIfError(response: SpotifyReponse) {
    if(response.error) {
      console.error(`ERROR: ${response.error.status} : ${response.error.message}`);
    }
  }

  handleDevice = (e: any) => {
    //setPlaybackDevice(device_id)
    this.setState({playbackDeviceId: e.target.value})
    console.log(e.target.value, this.state.playbackDeviceId)
  }

  handlePlaylist = (e: any) => {
    //setPlaybackDevice(device_id)
    this.setState({playlistURI: e.target.value})
    console.log(e.target.value, this.state.playlistURI)
  }

  async startPlayback() {
    if (!this.state.playbackDeviceId || !this.state.playlistURI) {
      alert('Select both a device and a playlist to get this party started!');
    } else {
      this.spotifyService.useDevice(this.state.playbackDeviceId);
      this.spotifyService.shuffle().then(response => {
        response.json().then((json) => {
          console.log(json);
        });
      });
      
      this.setState({
          partyStarted: true
      });
      
      // The second API call configures the context of the playback (i.e. which playlist)
      const startDevicePlayPlaylist = this.spotifyService.startPlaylist(this.state.playlistURI).then(response => {
        console.log(response);
      });
    }
  }

  async getCurrentlyPlaying() {
    this.spotifyService.getCurrentlyPlaying().then(data => {
      data.json().then((json: CurrentlyPlayingReponse) => {
        if(json.song) {
          this.setState({
            activeSong: json.song
          })
        }
        console.log("Currently playing song");
        console.log(json);
      })
    })
  }

  async skipToNextSong() {
    this.spotifyService.skipSong();
  }

  render() {
    return (
      <div className="App">
        {this.state.partyStarted?
        <div className="party-time app-body">
        <header className="nonfixed-header">
        <h1 className="app-title-nonfixed">Spowerfy 🍺</h1>
        </header>
        <h2>Currently Playing: </h2>
        <Timer getCurrentlyPlaying={this.getCurrentlyPlaying} skipToNextSong={this.skipToNextSong}></Timer>
            {this.state.activeSong && this.state.activeSong.item ?
            <div>
            <img src={this.state.activeSong.item.album.images[0].url} alt='album art of the current track'></img>
            <h3 style={{fontWeight: 'bold'}}>{this.state.activeSong.item.name}</h3>
            <h4 className="artist-name">{this.state.activeSong.item.album.artists[0].name}</h4> 
            </div>
            :
            <p>Loading playback..</p>
            }
        </div>
        :<div>
            {this.state.user ?
            <div>
                <header className="fixed-header">
                <h1 className="app-title">Spowerfy 🍺</h1>  
                <button  className="start-button" style={{float:"right"}} onClick={this.startPlayback}>Click to start your power hour</button>
                </header>
                <div className="app-body">
                <h2>Hello {this.state.user.name},</h2>
                <br></br>
                <h3>Your available devices to play from are: </h3>
                {this.state.devices ?
                <ul>
                    <form id="device-select">
                {this.state.devices.map((device: any) => (
                    <li className="device"><input type="radio" value={device.id} name="device" onClick={this.handleDevice}/>{device.name}</li>
                ))}</form>
                </ul>
                :
                <p>Loading devices...</p>
                }
                {this.state.playlists && this.state.playlists.length > 0 ?
                <div className="playlist-container">
                    <ul>
                    <form id="playlist-select">
                    {this.state.playlists.map((pl) => (
                        <div className="playlist-div">
                        <img className="playlist-images" src={pl.images[0]?.url} alt="Playlist art"></img>
                        <li className="playlist-name"><input type="radio" value={pl.uri} name="playlists" onClick={this.handlePlaylist}/>{pl.name}</li>
                        </div>
                    ))}
                    </form>
                    </ul>
                </div>
                : <p>Loading playlists...</p>
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
                window.location.assign('https://spowerfy-backend.herokuapp.com/login') }
            }
            style={{'fontSize': '20px'}}>Sign in with Spotify</button>
            </div>
        }
        </div>
        }
    </div>
    );
  }
}

export default App;