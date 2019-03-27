require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");

// You should then be able to access your keys information
// console.log(key.spotify)

var request;
var action;

// create functions for each command
function concertThis(request) {
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    request +
    "/events?app_id=codingbootcamp";
// axios callback
  axios.get(queryUrl).then(function(response) {
    
    // conditional statement 
    if (response.data.length < 10) {
      var length = response.data.length;
    } else {
      var length = 10;
    }


    for (i = 0; i < length; i++) {
      console.log(`Venue: ${response.data[i].venue.name}`);

      console.log(
        `Location: ${response.data[i].venue.city}, ${
          response.data[i].venue.region
        }`
      );

      
    }
  });
}

// Start spotify function

function spotifyThis(request) {
  // this is a console log just to check my keys
  // console.log(keys);
  // this line starts our search through our spotify api with our type and query
  spotify.search({ type: "track", query: request}, function(
    err,
    response
  ) {
    // if statement when we have an error
    if (err) {
      return console.log("Error occurred: " + err);
    }
    // if statement for when the results we get back are less than 10
    if (response.tracks.items.length < 10) {
      var length = response.tracks.items.length;

      // else statement for when the results we get back are 10 or more
    } else {
      var length = 10;
    }

    //    for loop that needs to still be finished
    for (var i = 0; i < length; i++) {
      console.log(`Artist: ${response.tracks.items[i].artists[0].name}`);
      console.log(`Song: ${response.tracks.items[i].name}`);
      console.log(`Preview: ${response.tracks.items[i].preview_url}`);
      console.log(`Album: ${response.tracks.items[i].album.name}\n`);
    }
  });
}

// movie this function
function movieThis(request) {
  if (!request) {
    request = "Mr. Nobody";
    console.log(
      "If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/"
    );
    console.log("It's on Netflix!");
  }
  var queryUrl =
    "http://www.omdbapi.com/?t=" + request + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(function(response) {
    console.log("Title: " + response.data.Title);
    console.log("Year: " + response.data.Year);
    console.log("IMDB rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
    console.log("Country: " + response.data.Country);
    console.log("Language(s): " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
    console.log("------------------fin----------------");
  });
}

// function doThis() {
//   //Read random.txt file
//   fs.readFile("random.txt", "utf8", function (error, data) {
//       if (!error);
//       console.log(data.toString());
      
//       var doesntWork = data.toString().split(',');
//   });
// }

function doThis() {
  fs.readFile("random.txt", "utf8", function (error, data) {
      var txt = data.split(',');
      spotifyThis(txt[1]);
      

  });
}


function start() {
  switch (process.argv[2]) {
    case "concert-this":
      concertThis(process.argv[3]);
      break;

    case "spotify-this":
      spotifyThis(process.argv[3]);
      break;

    case "movie-this":
      movieThis(process.argv[3]);
      break;

    case "do-this":
      doThis();
      break;

    default:
      console.log("invalid");
  }
}

start();
