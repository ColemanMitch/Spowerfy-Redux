import { Component, SyntheticEvent } from "react";
import { PlaylistsProps, PlaylistsState } from "../models/models";
import styled from 'styled-components';

const PlaylistContainer = styled.div`
  min-height: 20rem;
`;

const PlaylistItem = styled.li`
  align-content: center;
  vertical-align: middle;
  justify-content: space-between;
  font-size: 32px;
  display: flex;
  flex-direction: row;
  width: 100%;
  list-style-type: none;
`;

const PlaylistName = styled.h3`
  margin-top: auto;
  margin-bottom: auto;
`;

const PlaylistRadio = styled.input`
  margin-top: auto;
`;

const PlaylistDiv = styled.div`
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

const PlaylistImage = styled.img`
  height: 200px;
  margin-right: 20px;
  margin-top: 10px;
`;

const PlaylistSelectForm = styled.form`
  min-width: 50%;
  display: block;
  flex-direction: row !important;
  flex-wrap: wrap !important;
  justify-content: center;
  margin-right: 5%;
  margin-left: 5%;
`;

const PlaylistFilter = styled.input`
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

class Playlists extends Component<PlaylistsProps, PlaylistsState> {

  constructor(props: PlaylistsProps) {
    super(props);
    this.state = {
      playlistFilter: ''
    }
  }

  setActivePlaylist = (e: SyntheticEvent): void => {
    // TODO: Refactor to use e.target.addEventListener instead of needing to cast to HTMLInputElement
    const target = e.target as HTMLInputElement;
    this.props.setPlaylist(this.props.playlists.filter(pl => pl.uri === target.value)[0]);
  }

  filterPlaylist = (e: SyntheticEvent): void => {
    // TODO: Refactor to use e.target.addEventListener instead of needing to cast to HTMLInputElement
    const target = e.target as HTMLInputElement;
    this.setState({playlistFilter: target.value})
  }

  private checkIncludes(s1: string, s2: string) {
    return s1.toLowerCase().includes(s2.toLowerCase());
  }

  render () {
    return <div>
      <PlaylistFilter placeholder="Start typing to filter for your playlist" onChange={ this.filterPlaylist } value={ this.state.playlistFilter }/>
      { this.props.playlists.length > 0 ?
        <PlaylistContainer>
          <ul>
            <PlaylistSelectForm>
            { this.props.playlists.filter((playlists) => this.checkIncludes(playlists.name.toLowerCase(), this.state.playlistFilter.toLowerCase())).map((pl) => (
              <PlaylistDiv key={pl.uri}>
                <PlaylistImage src={pl.images[0]?.url} alt="Playlist art"></PlaylistImage>
                <PlaylistItem>
                  <PlaylistName>{pl.name}</PlaylistName>
                  <PlaylistRadio 
                    type="radio"
                    checked={ pl.name === this.props.activePlaylist?.name } 
                    value={pl.uri} 
                    name="playlists"
                    onChange={() => ({})} /* TODO: get this outta here */
                    onClick={ this.setActivePlaylist }
                  />
                </PlaylistItem>
              </PlaylistDiv>
            ))}
            </PlaylistSelectForm>
          </ul>
        </PlaylistContainer>
      : 
        <p>Loading playlists...</p>
      }
    </div>
  }
}

export default Playlists;
