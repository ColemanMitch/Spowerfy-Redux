![image](https://user-images.githubusercontent.com/44789534/162627337-af8a3ed6-8727-4603-9cd7-38729679d489.png)


#### Spowerfy-Redux is a web application built in React that controls the playback of the authenticated user's Spotify account to skip to the next song every minute on the minute for a whole hour. User's have the option to start the playback on any of their active devices and any of their playlists. Ideal use case for Spowerfy is to automate your next power hour! 🍺

#### It is also a refactor of an existing project that I built last year (2020) in Python with Flask which can be found linked [here](https://github.com/ColemanMitch/Spowerfy).

#### Technologies used:
* React
* Node.js
* Heroku
* OAuth
* HTML
* CSS 

# Running locally
See the README in the backend folder to get spotify api credentials. Then from the `backend` folder, run:
`npm start`

Then start the frontend by running these from the root:
`npm i`
`npm run-script build`
`npm start`

#### TO DO
* ~~Dropdown for devices instead of radio buttons~~
* ~~Text filter for playlists~~
* Clean up the rendering associated with playlist filtering 
* Pause/play button for playback once playback has been started
* ~~Use Spotify font throughout~~
