import Select from "react-select";
import { SelectMusicProps } from "../models/models";
import Playlists from "./Playlists";
import {RangeStepInput} from 'react-range-step-input';
import styled from "styled-components";

const PlaybackDeviceSelect = styled(Select)`
  margin: auto;
  width: 50%;
`;

const FixedHeader = styled.header`
  position: fixed;
  width: 100%;
  display: flex !important;
  flex-direction: row;
  background: black;
  justify-content: space-between;
  z-index: 2;
`;

const AppTitle = styled.h1`
  margin-left: 43%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Slider = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const StartButton = styled.button`
  background-color: #1ed05e;
  color: white;
  border: black solid 1px;
  border-radius: 10px;
  max-height: 25px;
  max-width: 250px;
  float: right;
`;

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
            <RangeStepInput id="songCounterSlider"
            min={10} max={120} value={props.numberOfSongs} step={5} onChange={props.changeNumberOfSongs}/>
            <span id="slideroutput">{props.numberOfSongs}</span>             
          </Slider>         
          <ul id="device-dropdown">
            <h3>Select your playback device</h3>
            <PlaybackDeviceSelect
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
