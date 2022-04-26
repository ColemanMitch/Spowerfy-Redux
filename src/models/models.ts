export interface TimerState {
  time: TimerCount; 
  songCount: number;
  ticking: boolean;
  partyOver: boolean;
}

export interface TimerProps {
  skipToNextSong: () => void;
  partyOver: () => void;
  interval: number;
  numberOfSongs: number;
  paused: boolean;
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
  activePlaylist?: Playlist;
  playlists: Playlist[];
  filteredPlaylists: Playlist[];
  partyStarted: boolean;
  partyOver: boolean;
  user?: User;
  activeSong?: Song;
  devices: Device[];
  loadingDevices: boolean;
  songLoaded: boolean;
  interval: number;
  numberOfSongs: number;
  paused: boolean;
}

export interface PlaylistsProps {
  playlists: Playlist[];
  startPlayback: (playlist: Playlist) => void;
}

export interface PlaylistsState {
  playlistFilter: string;
}

export interface SelectMusicProps {
  user: User;
  devices: Device[];
  playlists: Playlist[];
  activePlaylist?: Playlist;
  reloadDevices: () => void;
  handleDevice: (device: any) => void;
  startPlayback: (playlist: Playlist) => void;
  changeNumberOfSongs: (song: any) => void;
  numberOfSongs: number;
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

export interface Song {
  count: number;
}
