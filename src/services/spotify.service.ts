
const BASE_URL = 'https://api.spotify.com/v1';

export class SpotifyService {
  private _accessToken: string | null = null;

  constructor() {
    let parsed = new URLSearchParams(window.location.search);
    this._accessToken = parsed.get("access_token");
    
    if (!this._accessToken) {
      console.error('YIKES BOI, No access_token query param found');
    }
  }

  getAccessToken(): string | null {
    return this._accessToken;
  }

  async fetchMe() {
    return await fetch(`${BASE_URL}/me`, {
      headers: {'Authorization': 'Bearer ' + this._accessToken}
    });
  }

  async fetchDevices() {
    return await fetch(`${BASE_URL}/me/player/devices`, {
      headers: {'Authorization': 'Bearer ' + this._accessToken}
    });
  }

  async fetchPlaylists() {
    return await fetch(`${BASE_URL}/me/playlists?limit=50`, {
      headers: {'Authorization': 'Bearer ' + this._accessToken}
    });
  }

  async useDevice(deviceID: string) {
    return await fetch(`${BASE_URL}/me/player`, {
      method: 'PUT',
      headers: {'Authorization': 'Bearer ' + this._accessToken},
      body: JSON.stringify({ "device_ids": [deviceID], "play": true})
    });
  }

  async shuffle() {
    return await fetch(`${BASE_URL}/me/player/shuffle?state=true`,
    {
      method: 'PUT',
      headers: {'Authorization': 'Bearer ' + this._accessToken},
    });
  }

  async skipSong() {
    return await fetch('https://api.spotify.com/v1/me/player/next',
    {
      method: 'POST',
      headers: {'Authorization': 'Bearer ' + this._accessToken},
    });
  }

  async getCurrentlyPlaying() {
    return await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, 
    {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + this._accessToken},
    });
  }

  async startPlaylist(playlistURI: string) {
    return await fetch(`https://api.spotify.com/v1/me/player/play`, 
    {
      method: 'PUT',
      headers: {'Authorization': 'Bearer ' + this._accessToken},
      body: JSON.stringify({"context_uri": playlistURI})
    });
  }
}
