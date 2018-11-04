require("dotenv").config();

var request = require("request");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var runThis = process.argv[2]
var parameter = process.argv[3]

switch (runThis){
    case "concert-this":
    concert(parameter);
    break;
    case "spotify-this-song":
    spotifyTrack(parameter);
    break;
    case "movie-this":
    movie(parameter);
    break;
    case "do-what-it-says":
    doWhatItSays();
    break;
    default:
    console.log("Invalid!!!");
}

function concert(artistName){
    request("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp", function (err, res, body){
        if (err) throw err;
    
        var body = JSON.parse(body);
        console.log("Venue Name: " + body[0].venue.name);
        console.log("Venue Location: " + body[0].venue.city + " " + body[0].venue.region);
        console.log("Concert Date: " + body[0].datetime);
    });
};


function spotifyTrack(songName){
    if (songName){
        var query = songName;
        spotify.search({ type: 'track', query: query }, function(err, result){
            console.log("Artists: " + result.tracks.items[0].artists[0].name);
            console.log("Song Name: " + result.tracks.items[0].name);
            console.log("Spotify Link: " + result.tracks.items[0].external_urls.spotify);
            console.log("Album: " + result.tracks.items[0].album.name);
        });
    } else{
        console.log("Enter a song!");
    }
};

function movie(movieName){
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function (err, res, result){
            var body = JSON.parse(body);
            console.log("Movie Name: " + result.Title);
            console.log("Movie Release Year: " + result.Year);
            console.log("Rotten Rating: " + result.Ratings[1].Value);
            console.log("IMDB Rating: " + result.imdbRating);
            console.log("Country: " + result.Country);
            console.log("Language: " + result.Language);
            console.log("Movie Plot: " + result.Plot);
            console.log("Actors: " + result.Actors);
    });
};

function doWhatItSays() {
    fs.readFile('random.txt', "utf8", function (error, data) {
        var text = data.split(',');
        spotifyTrack(text[1]);
    });
};