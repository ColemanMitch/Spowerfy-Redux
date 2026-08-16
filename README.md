![image](https://user-images.githubusercontent.com/44789534/162627337-af8a3ed6-8727-4603-9cd7-38729679d489.png)


Spowerfy-Redux is a web application built in React that controls the playback of the authenticated user's Spotify account to skip to the next song every minute on the minute for a whole hour. User's have the option to start the playback on any of their active devices and any of their playlists. Ideal use case for Spowerfy is to automate your next power hour! 🍺

**Live app: https://spowerfy.onrender.com**

It is also a refactor of an existing project that I built back in 2020 in Python with Flask which can be found linked [here](https://github.com/ColemanMitch/Spowerfy).

#### Technologies used:
* React
* Node.js
* TypeScript
* Render
* OAuth
* HTML
* CSS 

# Running locally
- See the README in the backend folder to get Spotify API credentials. Then from the `backend` folder, run:
`npm start`
    - for more details about how to get the backend running locally checkout the backend README [here](./backend/README.md)
- Then start the frontend by running these from the root:
    - `npm i`
    - `npm run-script build`
    - `npm start`

# Hosting
Both halves of the app run on [Render](https://render.com).

| Part | Type of Render service | URL |
| --- | --- | --- |
| Frontend | Static Site | https://spowerfy.onrender.com |
| Backend | Web Service | https://spowerfy-backend.onrender.com |

The frontend service builds with `npm run build` and publishes the `build` folder. The `LOGIN_URL` in [`src/config/constants.ts`](./src/config/constants.ts) points at the backend, so change that value if you host the backend somewhere else. For the backend settings and the environment variables it needs, see the backend README [here](./backend/README.md).

Render deploys again automatically after each push to `main`.

Note: the free plan stops a service that gets no traffic for a period, and the next request starts it again. Thus the first login after an idle period can take approximately one minute.

#### TO DO
- [x] Dropdown for devices instead of radio buttons
- [x] Text filter for playlists
- [ ] Clean up the rendering associated with playlist filtering 
- [x] Pause/play button for playback once playback has been started~~
- [x] Use Spotify font throughout~~
