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
  font-size: $size-l;
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
`

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
      <input id="playlist-filter" placeholder="Start typing to filter for your playlist" onChange={ this.filterPlaylist } value={ this.state.playlistFilter }/>
      { this.props.playlists.length > 0 ?
        <PlaylistContainer>
          <ul>
            <form id="playlist-select">
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
            </form>
          </ul>
        </PlaylistContainer>
      : 
        <p>Loading playlists...</p>
      }
    </div>
  }
}

export default Playlists;
