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

export interface PlaylistsProps {
  playlists: Playlist[];
  startPlayback: (playlist: Playlist) => void;
}

export interface SelectMusicProps {
  user: User;
  devices: Device[];
  playlists: Playlist[];
  playbackDeviceId: string;
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
  id: string;
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
