import * as fs from 'fs';
import * as path from 'path';
import { COL } from './colors';
import express from 'express';
import request from 'request';

let app = express();

let redirect_uri = 
  process.env.REDIRECT_URI || 
  'http://localhost:8888/callback';

let CLIENT_SECRET = '';
let CLIENT_ID = '';
if(!process.env.SPOTIFY_CLIENT_ID) {
  fs.readFile(path.join(__dirname, "./spotify.credentials"), (err, data) => {
    if (err) {
      console.log(`${COL.RED}No credentials found\nPlease either set environment variables SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET\nOr export them from spowerfy-redux/backend/spotify.credentials${COL.END}`);
      process.exit(0);
    }

    // Windows putting in \r 🤮
    const ids = data.toString().replace(/\r/g, '').split('\n');
    
    if(ids.length < 2) {
      console.log(`${COL.RED}Credentials file invalid. Please use this format:\nCLIENT_ID\nCLIENT_SECRET${COL.END}`);
      process.exit(0);
    }

    CLIENT_ID = ids[0];
    CLIENT_SECRET = ids[1];
  });
} else {
  CLIENT_ID = process.env.SPOTIFY_CLIENT_ID ?? '';
  CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET ?? '';

  if(!CLIENT_ID || !CLIENT_SECRET) {
    console.log(`${COL.RED}SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET env var missing${COL.END}`);
    process.exit(0);
  }
}

function generateQueryString(params: { [key: string]: string }) {
  let str = '?';

  const arr = Object.entries(params);
  for(let i = 0; i < arr.length; i++) {
    const [param, value] = arr[i];
    str += encodeURIComponent(param) + '=' + encodeURIComponent(value) + (i < arr.length - 1 ? '&' : '');
  }

  return str;
}

app.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize' +
    generateQueryString({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: 'user-read-playback-state ' +
      'user-modify-playback-state ' +
      'user-read-currently-playing',
      redirect_uri
    })
  );
});

app.get('/callback', function(req, res) {
  let code = req.query.code || null;

  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
    },
    json: true
  };
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
    res.redirect(uri + '?access_token=' + access_token)
  });
})

let port = process.env.PORT || 8888;
console.log(`${COL.GREEN}Server running. Go to ${COL.YELLOW}http://localhost:${port}/login${COL.GREEN} to initiate authentication flow.${COL.END}`);
app.listen(port);
