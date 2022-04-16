
const BASE_URL = 'https://api.spotify.com/v1';

export class SpotifyService {
  private _accessToken: string | null = null;

  constructor() {
    const parsed = new URLSearchParams(window.location.search);
    this._accessToken = parsed.get("access_token");
    
    if (!this._accessToken) {
      console.error('No access_token query param found');
    }
  }

  getAccessToken(): string | null {
    return this._accessToken;
  }

  fetchMe() {
    return fetch(`${BASE_URL}/me`, {
      headers: {'Authorization': 'Bearer ' + this._accessToken}
    });
  }

  fetchDevices() {
    return fetch(`${BASE_URL}/me/player/devices`, {
      headers: {'Authorization': 'Bearer ' + this._accessToken}
    });
  }

  fetchPlaylists() {
    return fetch(`${BASE_URL}/me/playlists?limit=50`, {
      headers: {'Authorization': 'Bearer ' + this._accessToken}
    });
  }

  useDevice(deviceID: string) {
    return fetch(`${BASE_URL}/me/player`, {
      method: 'PUT',
      headers: {'Authorization': 'Bearer ' + this._accessToken},
      body: JSON.stringify({ "device_ids": [deviceID], "play": true})
    });
  }

  shuffle() {
    return fetch(`${BASE_URL}/me/player/shuffle?state=true`,
    {
      method: 'PUT',
      headers: {'Authorization': 'Bearer ' + this._accessToken},
    });
  }

  skipSong() {
    return fetch('https://api.spotify.com/v1/me/player/next',
    {
      method: 'POST',
      headers: {'Authorization': 'Bearer ' + this._accessToken},
    });
  }

  fetchCurrentlyPlaying() {
    return fetch(`https://api.spotify.com/v1/me/player/currently-playing`, 
    {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + this._accessToken},
    });
  }

  startPlaylist(playlistURI: string) {
    return fetch(`https://api.spotify.com/v1/me/player/play`, 
    {
      method: 'PUT',
      headers: {'Authorization': 'Bearer ' + this._accessToken},
      body: JSON.stringify({"context_uri": playlistURI})
    });
  }

  pauseCurrentPlayback() {
    return fetch(`https://api.spotify.com/v1/me/player/pause`, 
    {
      method: 'PUT',
      headers: {'Authorization': 'Bearer ' + this._accessToken},
    });
  }

  resumeCurrentPlayback() {
    return fetch(`https://api.spotify.com/v1/me/player/play`,
    {
      method: 'PUT',
      headers: {'Authorization': 'Bearer ' + this._accessToken},
    });
  }
}
