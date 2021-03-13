import React, { Component } from 'react';
import './App.css';
import { AppState } from './models/models';
import { SpotifyService } from './services/spotify.service';
import Timer from './Timer';

class App extends Component {
  private spotifyService: SpotifyService;

  state: AppState;

  constructor(props: {}) {
    super(props);
    this.state = {
      authenticated: false,
      serverData: {},
      filterString: '',
      playbackDeviceId: '',
      playlistURI: '',
      partyStarted: false,
    }
    this.spotifyService = new SpotifyService();
    
    this.startPlayback = this.startPlayback.bind(this);
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.skipToNextSong = this.skipToNextSong.bind(this)
  }

  async componentDidMount() {
      //let parsed = queryString.parse(window.location.search);
      //let accessToken = parsed.access_token;
      let parsed = new URLSearchParams(window.location.search) //queryString.parse();
      let accessToken = parsed.get("access_token")
      this.setState({
          myToken:accessToken
      });
      
      this.spotifyService.fetchMe().then(data => {
        console.log('ME');
        console.log(data);
      });
  
      this.spotifyService.fetchDevices().then(data => {
        console.log('Devices');
        console.log(data);
      });
  
      this.spotifyService.fetchPlaylists().then(data => {
        console.log('Playlists');
        console.log(data);
      });
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

    check = (formID: string) => {
        let radios = document.getElementById(formID);
        if(radios) {
          console.log(radios);
          // for (var i = 0, len = radios. length; i < len; i++) {
          //   if (radios[i].checked) {
          //       return true;
          //   }
          // }
        }
        return false;
    }

    async startPlayback() {
        let playbackDeviceSelected = this.check('device-select')
        let playlistSelected = this.check('playlist-select')
    
        console.log(playbackDeviceSelected, playlistSelected)
        if (!playbackDeviceSelected || !playlistSelected) {
          alert('Select both a device and a playlist to get this party started!')
       } else {
        this.spotifyService.useDevice(this.state.playbackDeviceId);
        this.spotifyService.shuffle().then(response => {
          console.log(response);
        })
        
        // this.setState({
        //     partyStarted: true
        // });
        
        // The second API call configures the context of the playback (i.e. which playlist)
        const startDevicePlayPlaylist = this.spotifyService.startPlaylist(this.state.playlistURI).then(response => {
          console.log(response);
        });
       }
    }

  async getCurrentlyPlaying() {
    const playbackData = await (await this.spotifyService.getCurrentlyPlaying()).json();
    console.log(playbackData);
    this.setState({
      playback: playbackData
    })
  }

  async skipToNextSong() {
    this.spotifyService.skipSong();
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        {this.state.partyStarted?
        <div className="party-time app-body">
        <header className="nonfixed-header">
        <h1 className="app-title-nonfixed">Spowerfy 🍺</h1>
        </header>
        <h2>Currently Playing: </h2>
        <Timer getCurrentlyPlaying={this.getCurrentlyPlaying} skipToNextSong={this.skipToNextSong} token={this.state.myToken}></Timer>
            {this.state.playback && this.state.playback.item ?
            <div>
            <img src={this.state.playback.item.album.images[0].url} alt='album art of the current track'></img>
            <h3 style={{fontWeight: 'bold'}}>{this.state.playback.item.name}</h3>
            <h4 className="artist-name">{this.state.playback.item.album.artists[0].name}</h4> 
            </div>
            :
            <p>Loading playback..</p>
            }
        </div>
        :<div>
            {this.state.user ?
            <div>
                <header className="fixed-header">
                <h1 className="app-title">Spowerfy 🍺 </h1>  
                <button  className="start-button" style={{float:"right"}} onClick={this.startPlayback}>Click to start your power hour</button>
                </header>
                <div className="app-body">
                <h2>Hello {this.state.user.name},</h2>
                <br></br>
                <h3>Your available devices to play from are: </h3>
                {this.state.devices ?
                <ul>
                    <form id="device-select">
                {this.state.devices.map((device) => (
                    <li className="device"><input type="radio" value={device.id} name="device" onClick={this.handleDevice}/>{device.name}</li>
                ))}</form>
                </ul>
                :
                <p>Loading devices...</p>
                }
                {this.state.playlists ?
                <div className="playlist-container">
                    <ul>
                    <form id="playlist-select" required>
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
                window.location = 'https://spowerfy-backend.herokuapp.com/login' }
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