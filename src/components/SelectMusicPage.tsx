import { SelectMusicProps } from "../models/models";
import Playlists from "./Playlists";
import {RangeStepInput} from 'react-range-step-input';
import { 
  PlaybackDeviceSelect,
  FixedHeader,
  AppTitle,
  Slider,
  StartButton,
  DeviceDropdown } from "../styles/SelectMusicPage.style"


const SelectMusicPage = (props: SelectMusicProps) => {
  return <div>
    <FixedHeader>
      <AppTitle>Spowerfy 🍺</AppTitle>  
      <StartButton onClick={props.startPlayback}>Click to start your power hour</StartButton>
    </FixedHeader>
    <div className="app-body">
      <h2>Hello {props.user?.name},</h2>
      <h3>Let's get this party started by configuring the number of songs, playback device, and playlist below!</h3>
      <hr></hr>
      <br></br>
      { props.devices ?
        <div>
          <h3>For how many songs would you like this session?</h3> 
          <Slider>
            <RangeStepInput style={{width: '50%'}}
            min={10} max={120} value={props.numberOfSongs} step={5} onChange={props.changeNumberOfSongs}/>
            <span id="slideroutput">{props.numberOfSongs}</span>             
          </Slider>         
          <DeviceDropdown>
            <h3>Select your playback device</h3>
            <PlaybackDeviceSelect
              options={props.devices.map(device => ({ label: device.name, value: device.id }))}
              onChange={props.handleDevice} 
            />
          </DeviceDropdown>
        </div>
        :
        <p>Loading devices...</p>
      }
      <Playlists playlists={props.playlists} activePlaylist={props.activePlaylist} setPlaylist={props.setPlaylist}/>
    </div>
  </div>
}


export default SelectMusicPage;
