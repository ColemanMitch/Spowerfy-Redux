# Spowerfy OAuth bridge

This service logs in to Spotify and redirects the user to the frontend application with a valid `access_token` as a parameter in the url.

| Environment | URL |
| --- | --- |
| Backend (this service) | https://spowerfy-backend.onrender.com |
| Frontend | https://spowerfy.onrender.com |

Both run on [Render](https://render.com).

## Development mode

In development mode, it assumes you are running the frontend on localhost:3000, but the server itself will be running on localhost:8888.

In order to start developing, register a Spotify Application here:
https://developer.spotify.com/my-applications

On that page, add http://localhost:8888/callback as a redirect url (don't forget to hit save at the bottom of the page)

Write the below commands in your terminal (replacing XXXX and YYYY with your actual client id and secret from the page where you registered your application)

```
export SPOTIFY_CLIENT_ID=XXXX
export SPOTIFY_CLIENT_SECRET=YYYY
```

You can also store your credentials locally in spowerfy-redux/backend/src/spotify.credentials in the following format:

```
client_id_here
client_secret_here
```
(Even though this file is in the .gitignore, be sure you don't commit it)

Then start the backend:

```
npm install
npm start
```

Then go to http://localhost:8888/login in your browser. This will initiate the login flow and finally redirect to http://localhost:3000?access_token=ZZZZZ where ZZZZZ is a valid access token that you can use to do operations in the Spotify API.

## Deploying to production

This service is deployed on Render as a Web Service.

### 1. Create the service

In the Render dashboard, select **New > Web Service** and connect this repository. Then set:

| Setting | Value |
| --- | --- |
| Root Directory | `backend` |
| Language | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |

### 2. Set the environment variables

| Variable | Example value |
| --- | --- |
| `SPOTIFY_CLIENT_ID` | `abc123` |
| `SPOTIFY_CLIENT_SECRET` | `cba456` |
| `REDIRECT_URI` | `https://spowerfy-backend.onrender.com/callback` |
| `FRONTEND_URI` | `https://spowerfy.onrender.com` |

Render supplies `PORT`. The server reads it, so do not set it yourself.

### 3. Tell Spotify about the callback url

In the Spotify application dashboard, add the same value that you used for `REDIRECT_URI` to the list of redirect urls, then save. Spotify refuses the login if the two values are different.

### 4. Deploy

Render builds and deploys again automatically after each push to the default branch.

You should now be able to go to https://spowerfy-backend.onrender.com/login and it will eventually redirect to https://spowerfy.onrender.com?access_token=ZZZZZ where ZZZZZ is a valid access token that you can use to do operations in the Spotify API.

### Note about the free plan

A free Render service stops when it gets no traffic for a period. The next request starts it again, and that start can take approximately one minute. Thus the first login after an idle period is slow. A paid instance type does not stop.
