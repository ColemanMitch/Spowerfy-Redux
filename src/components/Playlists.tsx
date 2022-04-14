import { Component, SyntheticEvent } from "react";
import { PlaylistsProps, PlaylistsState } from "../models/models";
import { 
  PlaylistContainer, 
  PlaylistItem, 
  PlaylistName, 
  PlaylistRadio, 
  PlaylistDiv, 
  PlaylistImage, 
  PlaylistSelectForm, 
  PlaylistFilter } from "../styles/Playlists.style"
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
