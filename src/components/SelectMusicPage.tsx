import Select from "react-select";
import { SelectMusicProps } from "../models/models";
import Playlists from "./Playlists";

const SelectMusicPage = (props: SelectMusicProps) => {
  return <div>
    <header className="fixed-header">
      <h1 className="app-title">Spowerfy 🍺</h1>  
      <button className="start-button" style={{float:"right"}} onClick={props.startPlayback}>Click to start your power hour</button>
    </header>
    <div className="app-body">
      <h2>Hello {props.user?.name},</h2>
      <br></br>
        { props.devices ?
        <ul id="device-dropdown">
          <h3>Select your playback device</h3>
          <Select className="playback-device-select"
            options={props.devices.map(device => ({ label: device.name, value: device.id }))}
            onChange={props.handleDevice} 
          />
        </ul>
        :
        <p>Loading devices...</p>
        }
      <Playlists playlists={props.playlists} activePlaylist={props.activePlaylist} setPlaylist={props.setPlaylist}/>
    </div>
  </div>
}


export default SelectMusicPage;
