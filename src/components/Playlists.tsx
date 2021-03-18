import { Component, SyntheticEvent } from "react";
import { PlaylistsProps, PlaylistsState } from "../models/models";


class Playlists extends Component<PlaylistsProps, PlaylistsState> {

  constructor(props: PlaylistsProps) {
    super(props);
    this.state = {
      playlistFilter: ''
    }
  }

  filterPlaylist = (e: SyntheticEvent): void => {
    // TODO: Refactor to use e.target.addEventListener instead of needing to cast to HTMLInputElement
    const target = e.target as HTMLInputElement;
    this.setState({
      playlistFilter: target.value
    });
  }

  render () {
    return <div>
      <input id="playlist-filter" placeholder="Start typing to filter for your playlist" onChange={ this.filterPlaylist } value={ this.state.playlistFilter }/>
      { this.props.playlists.length > 0 ?
        <div>
          <div className="playlist-container">
            <ul>
              <form id="playlist-select">
              { this.props.playlists.filter((playlists) => playlists.name.toLowerCase().includes(this.state.playlistFilter.toLowerCase())).map((pl) => (
                <div className="playlist-div">
                  <img className="playlist-images" src={pl.images[0]?.url} alt="Playlist art"></img>
                  <li className="playlist-name">
                    <h3 className="playlist-name-h3">{pl.name}</h3>
                    <input type="radio" value={pl.uri} name="playlists" onClick={this.filterPlaylist}/>
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
