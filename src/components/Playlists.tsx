import { SyntheticEvent, useState } from "react";
import { PlaylistsProps } from "../models/models";
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

const checkIncludes = (s1: string, s2: string) => {
  return s1.toLowerCase().includes(s2.toLowerCase());
};

const Playlists = (props: PlaylistsProps) => {
  const [playlistFilter, setPlaylistFilter] = useState('');

  const startPlayback = (playlistName: string): void => {
    props.startPlayback(props.playlists.filter(pl => pl.uri === playlistName)[0]);
  }

  const filterPlaylist = (e: SyntheticEvent): void => {
    // TODO: Refactor to use e.target.addEventListener instead of needing to cast to HTMLInputElement
    const target = e.target as HTMLInputElement;
    setPlaylistFilter(target.value);
    e.stopPropagation()
  }

  return <div>
    <h3>Start typing to filter for your playlist</h3>
    <PlaylistFilter placeholder="Type to filter for your playlist" onChange={ filterPlaylist } value={ playlistFilter }/>
    <hr style={{ marginTop: '2rem', color: '#000'}}/>
    { props.playlists.length > 0 ?
      <PlaylistContainer>
          <PlaylistSelectForm>
          { props.playlists.filter((playlists) => checkIncludes(playlists.name.toLowerCase(), playlistFilter.toLowerCase())).map((pl) => (
            <PlaylistDiv key={pl.uri}>
              <PlaylistImage src={pl.images[0]?.url} alt="Playlist art"></PlaylistImage>
              <PlaylistItem>
                <PlaylistName>{pl.name}</PlaylistName>
                <PlayButton onClick={() => startPlayback(pl.uri)} type="button">
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

export default Playlists;
