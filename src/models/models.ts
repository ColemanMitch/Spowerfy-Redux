export interface TimerState {
  time: TimerCount; 
  songCount: number;
}

export interface TimerProps {
  getCurrentPlaying: (token: string) => void;
  skipToNextSong: (token: string) => void;
  token: string;
}

export interface TimerCount {
  seconds: number;
  minutes: number;
}

export interface AppState {
  authenticated: boolean;
  serverData: Object;
  filterString: string;
  playbackDeviceId: string;
  playlistURI: string;
  partyStarted: boolean;
}
