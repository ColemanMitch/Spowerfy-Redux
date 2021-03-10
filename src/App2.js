import React, { Component } from 'react';
import './App.css';
import Timer from './Timer';


class App2 extends Component {
  constructor() {
    super();
    this.state = {
        authenticated: false,
        serverData: {},
        filterString: ''
    }
    this.startPlayback = this.startPlayback.bind(this);
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.skipToNextSong = this.skipToNextSong.bind(this)

    //this.check = this.bind.check();
  }
    async componentDidMount() {
        //let parsed = queryString.parse(window.location.search);
        //let accessToken = parsed.access_token;
        let parsed = new URLSearchParams(window.location.search) //queryString.parse();
        let accessToken = parsed.get("access_token")
        this.setState({
            myToken:accessToken
        });
        
        if (!accessToken) {
            return;
        } 
        else {
        const responseForMe = await fetch('https://api.spotify.com/v1/me', {
            headers: {'Authorization': 'Bearer ' + accessToken}
        });
        const userData = await responseForMe.json();
        this.setState({
            user: {
                name: userData.display_name
            }
        });

        const responseForDevices = await fetch('https://api.spotify.com/v1/me/player/devices', 
        {
            headers: {'Authorization': 'Bearer ' + accessToken}
        });
        const deviceData = await responseForDevices.json();
        this.setState({
            devices: deviceData.devices
        });
        console.log(this.state.devices)

        const responseForPlaylists = await fetch('https://api.spotify.com/v1/me/playlists?limit=50', 
        {
        headers: {'Authorization': 'Bearer ' + accessToken}
        });
        const playlistData = await responseForPlaylists.json();
        this.setState({
            playlists: playlistData.items
        });
        console.log(this.state.playlists)
        }
    
    }

    handleDevice  = (e) => {
        //setPlaybackDevice(device_id)
        this.setState({playbackDeviceId: e.target.value})
        console.log(e.target.value, this.state.playbackDeviceId)
    }

    handlePlaylist  = (e) => {
        //setPlaybackDevice(device_id)
        this.setState({playlistURI: e.target.value})
        console.log(e.target.value, this.state.playlistURI)
    }

    check = (formID) => {
        var radios = document.getElementById(formID);
        for (var i = 0, len = radios.length; i < len; i++) {
             if (radios[i].checked) {
                 return true;
             }
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
            // should check that playback is currently active?
            //console.log('Using token ', myToken, '\n start playback on \n', playbackDevice, '\n and playing the following uri \n', playbackContext);
            // This first API call just initiates whatever device you want to play
            const startDeviceResponse = await fetch(`https://api.spotify.com/v1/me/player`, 
            {
              method: 'PUT',
              headers: {'Authorization': 'Bearer ' + this.state.myToken},
              body: JSON.stringify({ "device_ids": [this.state.playbackDeviceId], "play": true})
            });
            console.log(startDeviceResponse);
            const shuffleResponse = await fetch(`https://api.spotify.com/v1/me/player/shuffle?state=true`,
            {
              method: 'PUT',
              headers: {'Authorization': 'Bearer ' + this.state.myToken},
            });
            console.log('shuffle api call:', shuffleResponse)
            this.setState({
                partyStarted: true
            });
            // The second API call configures the context of the playback (i.e. which playlist)
            const startDevicePlayPlaylist = await fetch(`https://api.spotify.com/v1/me/player/play`, 
            {
              method: 'PUT',
              headers: {'Authorization': 'Bearer ' + this.state.myToken},
              body: JSON.stringify({"context_uri": this.state.playlistURI})
            });
            console.log(startDevicePlayPlaylist)
            
       }
    }

    skipToNextSong = async (token) => {
        await fetch('https://api.spotify.com/v1/me/player/next',
        {
          method: 'POST',
          headers: {'Authorization': 'Bearer ' + token},
        });
    }

    async getCurrentlyPlaying(token) {
        const playbackResponse = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, 
        {
          method: 'GET',
          headers: {'Authorization': 'Bearer ' + token},
        });
        const playbackData = await playbackResponse.json();
        console.log(token)
        this.setState({
            playback: playbackData
        })
        console.log(this.state.playback)
    }

    async skipToNextSong(token) {
        await fetch('https://api.spotify.com/v1/me/player/next',
        {
          method: 'POST',
          headers: {'Authorization': 'Bearer ' + token},
        });
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
                <button  style={{float:"right"}} onClick={this.startPlayback}>Click to start your power hour</button>
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
                        <img className="playlist-images" src={pl.images[0].url} alt="Playlist art"></img>
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
            : <button onClick={() => {
                window.location = window.location.href.includes('localhost') 
                ? 'http://localhost:8888/login' 
                : 'https://spowerfy-backend.herokuapp.com/login' }
            }
            style={{padding: '20px', 'font-size': '50px', 'margin-top': '20px'}}>Sign in with Spotify</button>
        }
        </div>
        }
    </div>
    );
  }
}

export default App2;