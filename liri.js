require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var commandInput = process.argv[2];
var searchInput = process.argv[3];

// Make it so liri.js can take in one of the following commands:

// ***concert-this
// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")

if (commandInput === "concert-this"){
    console.log("***********************searching for a concert***********************")
    bandsInTown(searchInput)
}
else{
    bandsInTown("Hello");
    // console.log("Choose a band")
}
// ***spotify-this-song
// node liri.js spotify-this-song '<song name here>'
if (commandInput === "spotify-this-song"){
// This will show the following information about the song in your terminal/bash window
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// If no song is provided then your program will default to "The Sign" by Ace of Base.
// You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.
// The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:
    console.log("*********************searching for a song on spotify*********************")
    spotifySongs(searchInput);
}
else{
    spotifySongs("I want it that way");
}
//movie-this
if (commandInput === "movie-this"){
    console.log("****************************searching for a movie on OMDB********************")
    moviesDB(searchInput);
}
else{
    moviesDB("Matrix");

}
// do-what-it-says
// node liri.js do-what-it-says

// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

// Edit the text in random.txt to test out the feature for movie-this and concert-this.

if (commandInput === "do-what-it-says"){
   // console.log("searching for a random text inserted")
   readFromFS();


//put a ifElse into a function 
//function do this takes 2 args (command & search term)
// call the function again to pass arr[0] & arr [1]
}

// else{
//     console.log("LIRI does not know what to do")
// }


// node liri.js movie-this '<movie name here>'


// 


// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'


// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/


// It's on Netflix!




// You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.
function bandsInTown(band){
var queryUrl = "https://rest.bandsintown.com/artists/" + searchInput + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(function(response){
    console.log(response.data);

    });
}
//blueprint from spotifyAPI
function spotifySongs(songName){
    spotify.search({ type: 'track', query: searchInput, limit: 1}, function(error, data) {
        if (!error) {
            console.log("Artist : " + data.tracks.items.album.artists[3].name); 


            // var searchWordsSpaced  = function () {
            //         for (var i = 0; i < data.tracks.items.length; i++) {
            //             var searchSong = data.tracks.items[i];
            //             console.log("Artist : " + searchSong.artists[0].name); 
            //             // console.log(data);

            //         }
            //         // console.log(searchSpaced);
            //     };
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
  })
}
function readFromFS(){
fs.readFile("random.txt", "utf8", function(err,data){
//console.log(data);
var dataArr = data.split(",")
console.log(dataArr[1]);
});
}