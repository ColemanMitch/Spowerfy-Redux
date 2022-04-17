import { SelectMusicProps } from "../models/models";
import Playlists from "./Playlists";
import {RangeStepInput} from 'react-range-step-input';
import { 
  PlaybackDeviceSelect,
  FixedHeader,
  AppTitle,
  Slider,
  DeviceDropdown } from "../styles/SelectMusicPage.style"
import styled from "styled-components";
import { HUGE, LARGE, SMALL, XSMALL } from "../styles/sizes";

const SubHeader = styled.div`
  background-color: #1f1f1f;
  box-shadow: 0px 2px 2px 2px #1f1f1f;
  color: #d6d6d6;
  padding-top: ${SMALL};
  padding-bottom: ${SMALL};
  margin-bottom: ${HUGE};
`;

const PartyConfig = styled.div`
  margin-top: calc(${LARGE} * 2);
  margin-bottom: ${HUGE};
`;

const SelectMusicPage = (props: SelectMusicProps) => {
  return <div style={{paddingBottom: "50px"}}>
    <FixedHeader>
      <AppTitle>Spowerfy 🍺</AppTitle>
    </FixedHeader>
    <div className="app-body">
      <SubHeader>
        <h2 style={{height: "auto"}}>Hello {props.user?.name},</h2>
        <h3 style={{textAlign: "center"}}>Let's get this party started by configuring the number of songs, playback device, and playlist below!</h3>
      </SubHeader>
      { props.devices ?
        <PartyConfig>
          <h3>For how many songs would you like this session?</h3> 
          <Slider>
            <RangeStepInput style={{width: '50%'}}
            min={10} max={120} value={props.numberOfSongs} step={5} onChange={props.changeNumberOfSongs}/>
            <span id="slideroutput">{props.numberOfSongs}</span>             
          </Slider>         
          <DeviceDropdown>
            <h3>Select your playback device</h3>
            <div onClick={props.reloadDevices}>
              <PlaybackDeviceSelect
                options={props.devices.map(device => ({ label: device.name, value: device.id }))}
                onChange={props.handleDevice} 
              />
            </div>
          </DeviceDropdown>
        </PartyConfig>
        :
        <p>Loading devices...</p>
      }
      <Playlists playlists={props.playlists} startPlayback={props.startPlayback}/>
    </div>
  </div>
}


export default SelectMusicPage;
