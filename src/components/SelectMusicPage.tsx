import Select from "react-select";
import { SelectMusicProps } from "../models/models";
import Playlists from "./Playlists";
import {RangeStepInput} from 'react-range-step-input';
//import forceNumber from 'force-number';


const SelectMusicPage = (props: SelectMusicProps) => {
  return <div>
    <header className="fixed-header">
      <h1 className="app-title">Spowerfy 🍺</h1>  
      <button className="start-button" style={{float:"right"}} onClick={props.startPlayback}>Click to start your power hour</button>
    </header>
    <div className="app-body">
      <h2>Hello {props.user?.name},</h2>
      <h3>Let's get this party started by configuring the number of songs, playback device, and playlist below!</h3>
      <hr></hr>
      <br></br>
        { props.devices ?
        <div>
          <h3>For how many songs would you like this session?</h3> 
          <div className="slider">
            <RangeStepInput id="songCounterSlider"
            min={10} max={120} value={props.numberOfSongs} step={5} onChange={props.changeNumberOfSongs}/>
            <span id="slideroutput">{props.numberOfSongs}</span>             
          </div>         
          <ul id="device-dropdown">
            <h3>Select your playback device</h3>
            <Select className="playback-device-select"
              options={props.devices.map(device => ({ label: device.name, value: device.id }))}
              onChange={props.handleDevice} 
            />
          </ul>
          </div>
        :
        <p>Loading devices...</p>
        }
      <Playlists playlists={props.playlists} activePlaylist={props.activePlaylist} setPlaylist={props.setPlaylist}/>
    </div>
  </div>
}


export default SelectMusicPage;
