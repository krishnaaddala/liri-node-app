require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var commandInput = process.argv[2];
var searchInput = process.argv[3];


// **** leaving this code ONLY for a reference showing I tried to add the logic to handle when no movie name is entered
//but this logic did not work and I went ahead with the regular if else conditions.

// switch(commandInput) {
//     case "concert-this":
//       // code block
//       if (searchInput){
//         bandsInTown(searchInput)
//       }
//       else{
//         bandsInTown("Metallica")
//       }
//       break;
//     case "spotify-this-song":
//       // code block
//       if (searchInput){
//         spotifySongs(searchInput);
//     }
//       else{
//         spotifySongs("Hello");
//     }
//       break;
//     case "movie-this":
//       //code block
//       if (searchInput){
//         moviesDB(searchInput);
//     }
//       else{
//         moviesDB("Matrix");
//     }
//     case "do-what-it-says":
//        //code block
//        if (searchInput){
//         readFromFS();
//     }
//       else{
//         readFromFS("I want it this way");
//     }

//   }

//concert-this
if (commandInput === "concert-this") {
    console.log("***********************searching for a concert***********************")
    bandsInTown(searchInput);
}
//spotify-this
else if (commandInput === "spotify-this-song") {
    console.log("*********************searching for a song on spotify*********************")
    spotifySongs(searchInput);
}

//movie-this
else if (commandInput === "movie-this") {
    console.log("****************************searching for a movie on OMDB********************")
    moviesDB(searchInput);
}
//read from random.txt
else if (commandInput === "do-what-it-says") {
    console.log("******************************searching for a random.txt file**********************")
    readFromFS();
}

//bands in town function
function bandsInTown(band) {
    var bandsUrl = "https://rest.bandsintown.com/artists/" + searchInput + "/events?app_id=codingbootcamp";
    axios.get(bandsUrl).then(function (response) {
        for (i = 0; i < response.data.length; i++) {
            var date = response.data[i].datetime;
            var momentDate = moment(date).format('MM/DD/YYYY');
            console.log("\n\n Venue Name: " + response.data[i].venue.name + "\n\n Venue City: " + response.data[i].venue.city + "\n\n Date Of the Event: " + momentDate + "\n\n *****************************************************************************************");
        }
        
    });
}
//blueprint from spotifyAPI
function spotifySongs(songName) {
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

//OMDB API logic
function moviesDB(movie) {
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
//read from random.txt function
function readFromFS() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        var dataArr = data.split(",")
        spotifySongs(dataArr[1]);
    });
}