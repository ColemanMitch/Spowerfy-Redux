import { Component, SyntheticEvent } from "react";
import { PlaylistsProps, PlaylistsState } from "../models/models";


class Playlists extends Component<PlaylistsProps, PlaylistsState> {

  constructor(props: PlaylistsProps) {
    super(props);
    this.state = {
      playlistFilter: ''
    }
  }

  setActivePlaylist = (playlistURI: string): void => {
    // TODO: Refactor to use e.target.addEventListener instead of needing to cast to HTMLInputElement
    this.props.setPlaylist(this.props.playlists.filter(pl => pl.uri === playlistURI)[0]);
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
        <div>
          <div className="playlist-container">
            <ul>
              <form id="playlist-select">
              { this.props.playlists.filter((playlists) => this.checkIncludes(playlists.name.toLowerCase(), this.state.playlistFilter.toLowerCase())).map((pl) => (
                <div className="playlist-div" style={{backgroundColor: this.props.activePlaylist?.uri === pl.uri ? "#1ed05e": ""}} key={pl.uri} onClick={() => this.setActivePlaylist(pl.uri) }>
                  <img className="playlist-images" src={pl.images[0]?.url} alt="Playlist art"></img>
                  <li className="playlist-item">
                    <h6 className="playlist-name">{pl.name}</h6>
                  </li>
                </div>
              ))}
              </form>
            </ul>
          </div>
        </div>
      : 
        <p>Loading playlists...</p>
      }
    </div>
  }
}

export default Playlists;
