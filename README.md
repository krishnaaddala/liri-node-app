# liri-node-app
 LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Table of contents
Technologies Used
Applications Used
Screenshots of homework progress
Code Snippets

## Technologies Used
Javascript
AXIOS
node.js
Spotify API
FS
DOT ENV
Require
Moment JS
Markdown

## Applications Used
GitHub
ChromeDev tools
Visual Studio Code
Chrome browser

## Screenshots of homework progress

![Code progression Final](https://github.com/krishnaaddala/liri-node-app/blob/master/Images/Concert-liri-img.png "LIRI BANDSInTOWN API Final Layout 1")

![Code progression Final](https://github.com/krishnaaddala/liri-node-app/blob/master/Images/spotofyAPI-liri.png "LIRI SPOTIFYAPI Final Layout 2")

![Code progression Final](https://github.com/krishnaaddala/liri-node-app/blob/master/Images/omdbAPI-liri.png "LIRI OMDBAPI Final Layout 3")

![Code progression Final](https://github.com/krishnaaddala/liri-node-app/blob/master/Images/readFromRandom-liri.png "LIRI READFromRandomTEXTFile Final Layout 4")


## Gif walkthrough

![Giphy 1](https://github.com/krishnaaddala/liri-node-app/blob/master/Images/Gify1-LIRI.gif)
![Giphy 2](https://github.com/krishnaaddala/liri-node-app/blob/master/Images/Gify2-LIRI.gif)


## Code Snippets

```require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
  ```

  ```function bandsInTown(band) {
    var bandsUrl = "https://rest.bandsintown.com/artists/" + searchInput + "/events?app_id=codingbootcamp";
    axios.get(bandsUrl).then(function (response) {
        for (i = 0; i < response.data.length; i++) {
            var date = response.data[i].datetime;
            var momentDate = moment(date).format('MM/DD/YYYY');
            console.log("\n\n Venue Name: " + response.data[i].venue.name + "\n\n Venue City: " + response.data[i].venue.city + "\n\n Date Of the Event: " + momentDate + "\n\n *****************************************************************************************");
        }
        
    });
}
  ```

  ``` function spotifySongs(songName) {
    spotify.search({ type: 'track', query: searchInput, limit: 1 }, function (error, data) {
        if (!error) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                var searchSong = data.tracks.items[i];
                console.log("\n\n Artist : " + searchSong.artists[i].name + "\n\n Song Name: " + searchSong.name + "\n\n Preview Link of song on Spotify : " + searchSong.preview_url + "\n\n Album Name : " + searchSong.album.name + "\n\n*************************************************************************************");

            }
        }
        else {
            return console.log('Error occurred: ' + error);
        }
    });
}
  ```
  ```function moviesDB(movie) {
    var queryUrl = "http://www.omdbapi.com/?t=" + searchInput + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            console.log("\nTitle: " + response.data.title);
            console.log("\nYear: " + response.data.Year);
            console.log("\nIMDB Rating: " + response.data.imdbRating);
            console.log("\nRotten Tomatoes Rating: " + response.data.tomatoRating);
            console.log("\nCountry: " + response.data.Country);
            console.log("\nLanguage: " + response.data.Language);
            console.log("\nPlot: " + response.data.Plot);
            console.log("\nActors: " + response.data.Actors);
            console.log("\n*********************************************************************")
        });
}
  ```
Git commands:

```git status
    git add .
    git commit -m "message"
    git push origin master
    ```