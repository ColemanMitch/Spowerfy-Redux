import { Component, SyntheticEvent } from "react";
import { PlaylistsProps, PlaylistsState } from "../models/models";
import { 
  PlaylistContainer,
  PlaylistItem,
  PlayButtonIcon,
  PlaylistName,
  PlaylistDiv,
  PlaylistImage,
  PlaylistSelectForm,
  PlaylistFilter,
  PlayButton} from "../styles/Playlists.style";
import playIcon from "../images/playIcon.png";

class Playlists extends Component<PlaylistsProps, PlaylistsState> {

  constructor(props: PlaylistsProps) {
    super(props);
    this.state = {
      playlistFilter: ''
    }
  }

  startPlayback = (playlistName: string): void => {
    this.props.startPlayback(this.props.playlists.filter(pl => pl.uri === playlistName)[0]);
  }

  filterPlaylist = (e: SyntheticEvent): void => {
    // TODO: Refactor to use e.target.addEventListener instead of needing to cast to HTMLInputElement
    const target = e.target as HTMLInputElement;
    this.setState({playlistFilter: target.value})
    e.stopPropagation()
  }

  private checkIncludes(s1: string, s2: string) {
    return s1.toLowerCase().includes(s2.toLowerCase());
  }

  render () {
    return <div>
      <h3>Start typing to filter for your playlist</h3> 
      <PlaylistFilter placeholder="Type to filter for your playlist" onChange={ this.filterPlaylist } value={ this.state.playlistFilter }/>
      <hr style={{ marginTop: '2rem', color: '#000'}}/>
      { this.props.playlists.length > 0 ?
        <PlaylistContainer>
            <PlaylistSelectForm>
            { this.props.playlists.filter((playlists) => this.checkIncludes(playlists.name.toLowerCase(), this.state.playlistFilter.toLowerCase())).map((pl) => (
              <PlaylistDiv key={pl.uri}>
                <PlaylistImage src={pl.images[0]?.url} alt="Playlist art"></PlaylistImage>
                <PlaylistItem>
                  <PlaylistName>{pl.name}</PlaylistName>
                  <PlayButton onClick={() => this.startPlayback(pl.uri)} type="button">
                    <PlayButtonIcon src={playIcon}></PlayButtonIcon>
                  </PlayButton>
                </PlaylistItem>
              </PlaylistDiv>
            ))}
            </PlaylistSelectForm>
        </PlaylistContainer>
      : 
        <p>Loading playlists...</p>
      }
    </div>
  }
}

export default Playlists;
