import styled from "styled-components";
import { LARGE, SMALL } from "./sizes";

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
  padding: 0;
`;

export const PlaylistName = styled.h3`
  margin-top: auto;
  margin-bottom: auto;
`;

export const PlayButton = styled.button`
  border-radius: ${SMALL};
  margin-top: auto;
  margin-bottom: auto;
  background-color: transparent;
  border-width: 0;
  height: 100%;
  min-width: 75px;
  width: 15%;
`;

export const PlaylistDiv = styled.div`
  display: flex;
  flex-direction: row;
  border: #303030 3px solid;
  border-radius: ${SMALL};
  min-width: 50%;
  max-height: 4%;
  margin: 1%;

  &:hover {
    background-color: #1DB954;
  }
`;

export const PlaylistImage = styled.img`
  border-radius: ${SMALL};
  height: 200px;
  margin-right: ${LARGE};
  margin-left: ${SMALL};
  margin-top: ${SMALL};
  margin-bottom: ${SMALL};
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
