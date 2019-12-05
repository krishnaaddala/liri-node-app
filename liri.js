require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var commandInput = process.argv[2];
var searchInput = process.argv[3];

//concert-this
if (commandInput === "concert-this"){
    console.log("***********************searching for a concert***********************")
    bandsInTown(searchInput)
}
//spotify-this
else if (commandInput === "spotify-this-song"){
    console.log("*********************searching for a song on spotify*********************")
    spotifySongs(searchInput);
}

//movie-this
else if (commandInput === "movie-this"){
    console.log("****************************searching for a movie on OMDB********************")
    moviesDB(searchInput);
}
//read from random.txt
else if (commandInput === "do-what-it-says"){
   console.log("******************************searching for a random.txt file**********************")
   readFromFS();
}
//bands in town function
function bandsInTown(band){
var bandsUrl = "https://rest.bandsintown.com/artists/" + searchInput + "/events?app_id=codingbootcamp";
    axios.get(bandsUrl).then(function(response){
        for (i=0; i < response.data.length; i++){
    console.log(response.data[i].venue.name + " " +response.data[i].venue.city + " " +response.data[i].datetime);
        }
    });
}
//blueprint from spotifyAPI
function spotifySongs(songName){
    spotify.search({ type: 'track', query: searchInput, limit: 1}, function(error, data) {
        if (!error) {
                    for (var i = 0; i < data.tracks.items.length; i++) {
                        var searchSong = data.tracks.items[i];
                        console.log("Artist : " + searchSong.artists[i].name + searchSong.name + searchSong.preview_url + searchSong.album.name); 

                    }
        }
      else{
        return console.log('Error occurred: ' + error);
      }
      });
}
//This will output the following information to your terminal/bash window:
//   * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Rotten Tomatoes Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.
// You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.

function moviesDB(movie){
    var queryUrl = "http://www.omdbapi.com/?t=" + searchInput + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
    function(response) {
    console.log("Title: " + response.data.title);
    console.log("Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.tomatoRating);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  });
}
//read from random.txt function
function readFromFS(){
fs.readFile("random.txt", "utf8", function(err,data){
//console.log(data);
var dataArr = data.split(",")
spotifySongs(dataArr[1]);
});
}