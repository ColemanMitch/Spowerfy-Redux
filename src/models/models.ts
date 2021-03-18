import { SyntheticEvent } from "react";

export interface TimerState {
  time: TimerCount; 
  songCount: number;
  ticking: boolean;
}

export interface TimerProps {
  skipToNextSong: () => void;
}

export interface TimerCount {
  seconds: number;
  minutes: number;
}

export interface AppState {
  authenticated: boolean;
  serverData?: unknown;
  filterString: string;
  playbackDeviceId: string;
  playlistURI: string;
  playlists: Playlist[];
  filteredPlaylists: Playlist[];
  playlistFilter: string;
  partyStarted: boolean;
  user?: User;
  activeSong?: Song;
  devices: Device[];
  songLoaded: false;
}

export interface PlaylistsProps {
  playlists: Playlist[];
  setPlaylists: (e: SyntheticEvent) => void;
}

export interface PlaylistsState {
  playlistFilter: string;
  filteredPlaylists: Playlist[];
}

export interface Song {
  album: Album;
  name: string;
}

export interface Album {
  images: Image[];
  artists: Artist[];
}

export interface Image {
  url: string;
}

export interface Artist {
  name: string;
}

export interface User {
  name: string;
}

export interface Device {
  id: number;
  name: string;
}

export interface Playlist {
  name: string;
  uri: string;
  images: Image[];
}
