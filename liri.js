require("dotenv").config();



// Vars

let input1 = process.argv[2]
let input2 = process.argv[3]

var keys = require("./keys.js");

var request = require('request');

var spotify = require('node-spotify-api');

var fs = require('fs');
 
var spotify = new spotify(keys.keys);

function runAll() {

if (input1 === "spotify-this-song") {
    spotifyRun(input2)   
}
else if (input1 === "movie-this") {
    omdbRun(input2)
}
else if (input1 === "concert-this") {
    bandsInTownRun(input2)
}
else if (input1 === "do-what-it-says") {
    doWhatItSaysRun()
}
}

runAll();

//spotify search 

function spotifyRun(song){

spotify.search({ type: 'track', query: song }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log("song name: " +data.tracks.items[0].name); 
console.log("artist name: " +data.tracks.items[0].artists[0].name)
console.log("album name: " +data.tracks.items[0].album.name)
console.log("sample URL: " +data.tracks.items[0].external_urls.spotify)
});
}

//Bands in Town

function omdbRun(film) {

let url = "http://www.omdbapi.com/?t=" + film + "&apikey=" +keys.keys.movies

request(url, function(error, response, body){
let info = JSON.parse(body)
console.log("Title: " + info.Title)
console.log("Year of Release: " + info.Year)
console.log("Rating: " + info.Rated)
console.log("Rotten Tomatoes: " + info.Ratings[1].Value)
console.log("Made in: " + info.Country)
console.log("Language: " + info.Language)
console.log("Plot: " + info.Plot)
console.log("Main Actors: " + info.Actors)
}
)}

//Bands in Town

function bandsInTownRun(band) {

let url = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp"

request(url, function(error, response, body){
 
    let info = JSON.parse(body)

    console.log("Name of Venue: " + info[0].venue.name)
    console.log("Location of Venue: " + info[0].venue.city)
    console.log("Date of Show: " + info[0].datetime)
    
})
}

function doWhatItSaysRun(){
    fs.readFile('./random.txt', 'utf8', (err, data) => {
        if (err) throw err;
       
        var array = data.split(",")
        console.log(array)


        input2 = array[1]
input1 = array[0]
        runAll();
    
      });
}
