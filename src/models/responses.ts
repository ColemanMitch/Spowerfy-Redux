import { Device, Playlist, Song } from "./models";

export interface SpotifyReponse {
  error?: Error
}

export interface Error {
  message: string;
  status: number;
}

export interface MeResponse extends SpotifyReponse {
  display_name?: string;
}

export interface DevicesResponse extends SpotifyReponse {
  devices?: Device[];
}

export interface PlaylistsResponse extends SpotifyReponse {
  items?: Playlist[];
}

export interface CurrentlyPlayingReponse extends SpotifyReponse {
  song?: Song;
}
