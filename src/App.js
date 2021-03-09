import React, { useState, useEffect } from 'react';
import './App.css';
import Timer from './Timer';

function App() {
  const [myToken, setMyToken] = useState()
  const [authenticated, setAuthenticated] = useState(false);
  //const [myData, setMyData] = useState()
  const [userName, setUserName] = useState();
  const [playbackDevice, setPlaybackDevice] = useState();
  const [userDevices, setUserDevices] = useState([]);
  const [playbackContext, setPlaybackContext] = useState();
  const [playlists, setPlaylists] = useState([]);
  const [partyStarted, setPartyStarted] = useState(false);
  const [playback, setPlayback] = useState({});

  const [currentlyPlaying, setCurrentlyPlaying] = useState(false);
  
  
  
  useEffect(() => {
    fetchMyData();
  },[authenticated]);


  const fetchMyData = async () => {
    setAuthenticated(true)
    let parsed = new URLSearchParams(window.location.search)//queryString.parse();
    let accessToken = parsed.get("access_token")//parsed.access_token;
    setMyToken(accessToken)
    if (!accessToken) {
      return;
    }
    
    const apiCall = await fetch('https://api.spotify.com/v1/me', 
    {
      headers: {'Authorization': 'Bearer ' + accessToken}
    });
    const data = await apiCall.json();
    console.log(data)
    setUserName(data.display_name);
    
    // API call to get all available devices
    const response2 = await fetch('https://api.spotify.com/v1/me/player/devices', 
    {
      headers: {'Authorization': 'Bearer ' + accessToken}
    });
    const data2 = await response2.text();
    const json2 = data2 === "" ? {} : JSON.parse(data2);
    console.log(json2.devices)
    setUserDevices(json2.devices)
    console.log(data2)

     // API call to get all users playlists
    const response3 = await fetch('https://api.spotify.com/v1/me/playlists?limit=50', 
    {
      headers: {'Authorization': 'Bearer ' + accessToken}
    });
    const data3 = await response3.text();
    const json3 = data3 === "" ? {} : JSON.parse(data3);
    console.log(json3.items)
    setPlaylists(json3.items)
  }


  const setDevice = async (device_id) => {
    setPlaybackDevice(device_id)
    console.log(device_id, playbackDevice)
  }

  const setContextURI = async (context_uri) => {
    setPlaybackContext(context_uri)
    console.log(context_uri, playbackContext)
  }

  const skipToNextSong = async (token) => {
    await fetch('https://api.spotify.com/v1/me/player/next',
    {
      method: 'POST',
      headers: {'Authorization': 'Bearer ' + token},
    });
  }

  function check(formID){
    var radios = document.getElementById(formID);
    for (var i = 0, len = radios.length; i < len; i++) {
         if (radios[i].checked) {
             return true;
         }
    }
    return false;
  }
  

  const startPlayback = async () => {
    let playbackDeviceSelected = check('device-select')
    let playlistSelected = check('playlist-select')

    console.log(playbackDeviceSelected, playlistSelected)
    if (!playbackDeviceSelected || !playlistSelected) {
      alert('Select both a device and a playlist to get this party started!')
    } else {
      // should check that playback is currently active?
      //console.log('Using token ', myToken, '\n start playback on \n', playbackDevice, '\n and playing the following uri \n', playbackContext);
      // This first API call just initiates whatever device you want to play
      const startDevicePlay = await fetch(`https://api.spotify.com/v1/me/player`, 
      {
        method: 'PUT',
        headers: {'Authorization': 'Bearer ' + myToken},
        body: JSON.stringify({ "device_ids": [playbackDevice], "play": true})
      });
      console.log(startDevicePlay);
      const shuffleCall = await fetch(`https://api.spotify.com/v1/me/player/shuffle?state=true`,
      {
        method: 'PUT',
        headers: {'Authorization': 'Bearer ' + myToken},
      });
      console.log('shuffle api call:', shuffleCall)

      // The second API call configures the context of the playback (i.e. which playlist)
      const startDevicePlayPlaylist = await fetch(`https://api.spotify.com/v1/me/player/play`, 
      {
        method: 'PUT',
        headers: {'Authorization': 'Bearer ' + myToken},
        body: JSON.stringify({"context_uri": playbackContext})
      });
      console.log(startDevicePlayPlaylist);
      setPartyStarted(true)

    }
  }

  useEffect(() => {
    getCurrentlyPlaying(myToken);

  },[partyStarted, myToken]);


  const getCurrentlyPlaying = async (token) => {
    const playbackResponse = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, 
    {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + token},
    });
    const playbackData = await playbackResponse.json();
    console.log(token)
    setCurrentlyPlaying(true)
    setPlayback(playbackData)
    console.log(playback)
  }


  return (partyStarted && currentlyPlaying 
    ? 
    <div className="party-time app-body">
      <header className="nonfixed-header">
      <h1 className="app-title-nonfixed">Spowerfy 🍺</h1>
      </header>
      <h2>Currently Playing: </h2>
      <Timer skipToNextSong={skipToNextSong} token={myToken} getCurrentlyPlaying={getCurrentlyPlaying}></Timer>
      <img src={playback.item.album.images[0].url} alt='album art of the current track'></img>
      <h3 style={{fontWeight: 'bold'}}>{playback.item.name}</h3>
      <h4 className="artist-name">{playback.item.album.artists[0].name}</h4> 
  </div>
  :
   ! (userName && userDevices && playlists)
   ?
    <div>
      <h1>Spowerfy</h1>
      <button onClick={() =>{
      window.location = window.location.href.includes('localhost') 
              ? 'http://localhost:8888/login' 
              : 'https://spowerfy-backend.herokuapp.com/login'}}>
              Click to authenticate</button>
    </div>
    :
    <div>
    <header className="fixed-header">
    <h1 className="app-title">Spowerfy 🍺 </h1>  
    <button  style={{float:"right"}} onClick={() => startPlayback()}>Click to start your power hour</button>
    </header>
    <div className="app-body">
    <h2>Hello {userName},</h2>
    <br></br>
    <h3>Your available devices to play from are: </h3>   
      <ul>
        <form id="device-select">
      {userDevices.map((device) => (
          <li className="device"><input onChange={() => setDevice(device.id)} type="radio" value={device.id} name="device" />{device.name}</li>
      ))}</form>
      </ul>
      <hr></hr>
      <div className="playlists-header">
        <h2>Playlists</h2>
        <input type="text" placeholder={"Search for a specific playlist by typing its name in this field"}></input>
      </div>
      <div className="playlist-container">
          <ul>
          <form id="playlist-select" required>
          {playlists.map((pl) => (
            <div className="playlist-div">
            <img className="playlist-images" src={pl.images[0].url}></img>
            <li className="playlist-name"><input onChange={() => setContextURI(pl.uri)} type="radio"  name="playlists" />{pl.name}</li>
            </div>
          ))}
        </form>
        </ul>
        </div>
      </div>
  </div>
  );
}

export default App;
