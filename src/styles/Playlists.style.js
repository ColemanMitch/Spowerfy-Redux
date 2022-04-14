import styled from "styled-components";

export const PlaylistContainer = styled.div`
  min-height: 20rem;
`;

export const PlaylistItem = styled.li`
  align-content: center;
  vertical-align: middle;
  justify-content: space-between;
  font-size: 32px;
  display: flex;
  flex-direction: row;
  width: 100%;
  list-style-type: none;
`;

export const PlaylistName = styled.h3`
  margin-top: auto;
  margin-bottom: auto;
`;

export const PlaylistRadio = styled.input`
  margin-top: auto;
`;

export const PlaylistDiv = styled.div`
  display: flex;
  flex-direction: row;
  border: #858585 1px solid;
  border-radius: 5px;
  min-width: 50%;
  max-height: 4%;
  padding: 1%;
  margin: 1%;

  &:hover {
    background-color: #1ed05e;
  }
`;

export const PlaylistImage = styled.img`
  height: 200px;
  margin-right: 20px;
  margin-top: 10px;
`;

export const PlaylistSelectForm = styled.form`
  min-width: 50%;
  display: block;
  flex-direction: row !important;
  flex-wrap: wrap !important;
  justify-content: center;
  margin-right: 5%;
  margin-left: 5%;
`;

export const PlaylistFilter = styled.input`
  align-items: center;
  margin: auto;
  margin-top: 1rem;
  background-color: white;
  border-bottom-color: #cccccc;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-left-color: #cccccc;
  border-left-style: solid;
  border-left-width: 1px;
  border-right-color: #cccccc;
  border-right-style: solid;
  border-right-width: 1px;
  border-top-color: #cccccc;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-top-style: solid;
  border-top-width: 1px;
  box-sizing: border-box;
  cursor: default;
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  font-stretch: 100%;
  font-style: normal;
  font-variant-caps: normal;
  font-variant-east-asian: normal;
  font-variant-ligatures: normal;
  font-variant-numeric: normal;
  font-weight: 400;
  min-height: 50px;
  min-width: 50%;
  font-family: Proxima Nova;
`;
