import styled from "styled-components";
import Select from "react-select";

export const PlaybackDeviceSelect = styled(Select)`
  margin: auto;
  width: 50%;
`;

export const FixedHeader = styled.header`
  position: fixed;
  width: 100%;
  display: flex !important;
  flex-direction: row;
  background: black;
  justify-content: space-between;
  z-index: 2;
`;

export const AppTitle = styled.h1`
  margin-left: 43%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Slider = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const StartButton = styled.button`
  background-color: #1ed05e;
  color: white;
  border: black solid 1px;
  border-radius: 10px;
  max-height: 25px;
  max-width: 250px;
  float: right;
`;

export const DeviceDropdown = styled.ul`
  margin: 0;
  padding: 0;
`;
