export interface TimerState {
  time: TimerCount; 
  songCount: number;
  ticking: boolean;
}

export interface Event {
  target: { value: string };
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
  serverData?: Object;
  filterString: string;
  playbackDeviceId: string;
  playlistURI: string;
  playlists: any[];
  partyStarted: boolean;
  user?: User;
  activeSong?: Song;
  devices: Device[];
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
