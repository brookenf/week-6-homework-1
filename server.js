// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


//-------------------------------------------------------------//
//----------------------- AUTHORIZATION -----------------------//
//-------------------------------------------------------------//


// Initialize Spotify API wrapper
var SpotifyWebApi = require('spotify-web-api-node');

// The object we'll use to interact with the API
var spotifyApi = new SpotifyWebApi({
  clientId : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET
});

// Using the Client Credentials auth flow, authenticate our app
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
  
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
    console.log('Got an access token: ' + spotifyApi.getAccessToken());
  
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  });


//-------------------------------------------------------------//
//------------------------- API CALLS -------------------------//
//-------------------------------------------------------------//


app.get('/search-track', function (request, response) {
  
  // Search for multiple tracks
  var multitrack = ['track:Jennie', 'track:Helplessness Blues'];
  
  multitrack.forEach((s) => {
     // Search for a track!
  spotifyApi.searchTracks('track:Jennie Helplessness Blues', 
                          {limit: 1})
    .then(function(data) {
    
      // Send the first (only) track object
      s.data = data.body.tracks.items[0];
      console.log(s.data);
      // response.send(data.body.tracks.items[0]);
      while (multitrack.filter(s => s.data !== undefined).length === multitrack.length){
        // response.send(multitrack);
      }
    
    }, function(err) {
      console.error(err);
    });
  
  
  });
 
});

app.get('/category-playlists', function (request, response) {
  
  // Make an initial list of countries
  let countries = [
    {
      name: "Canada",
      code: "CA"
    },
    {
      name: "Japan",
      code: "JP"
    },
  ];
  
  
  // Get the playlists for the given category for each country
  countries.forEach((c) => {
    spotifyApi.getPlaylistsForCategory(
      'kpop', 
      { country: c.code, limit : 10 }
    )
      .then((data) => {
        // Persist the data on this country object
        c.data = data.body;
    }, function(err) {
      console.error(err);
    });
  });
  
  // Check will see if we have .data on all the country objects
  // which indicates all requests have returned successfully.
  // If the lengths don't match then we call check again in 500ms
  let check = () => {
    if (countries.filter(c => c.data !== undefined).length 
    !== countries.length) {
      setTimeout(check, 500);
    } else {
      response.send(countries);
    }
  }
  
  // Call check so we don't send a response until we have all the data back
  check();
});

app.get('/tracks', function(request, response) { 
  //Get the name of the specific track from ID
  spotifyApi.getTracks(['5qUAdDl59w0Vbu4Gi6ecSX', '7GhIk7Il098yCjg4BQjzvb'])
    .then(function(data) {
      
      //send the data
      response.send(data.body.tracks);
    
    }, function(err) {
      console.error(err);
    });
});

app.get('/audio-features', function (request, response) {
  
  // Get the audio features for a track ID
  spotifyApi.getAudioFeaturesForTracks(['5qUAdDl59w0Vbu4Gi6ecSX', '7GhIk7Il098yCjg4BQjzvb'])
    .then(function(data) {
    
      //Send the audio features object
      response.send(data.body.audio_features);
    
    }, function(err) {
      console.error(err);
    });
});

app.get('/artist', function (request, response) {
  
  // Get information about an artist
  spotifyApi.getArtists(['6jJ0s89eD6GaHleKKya26X', '31TPClRtHm23RisEBtV3X7'])
    .then(function(data) {
    
      // Send the list of tracks
      response.send(data.body.artists);
    
    }, function(err) {
      console.error(err);
    });
});

app.get('/artist-top-tracks', function (request, response) {
  
 // Get an artist's top tracks in a country
  let topTracks = [
    {
      trackId: "0LcJLqbBmaGUft1e9Mm8HV",
      name: "ABBA",
      country: "Sweden"
    },
    {
      trackId: '31TPClRtHm23RisEBtV3X7',
      name: "Justin Timberlake",
      country: "Sweden"
    }
  ];
  
  topTracks.forEach((t) => {
    spotifyApi.getArtistTopTracks(t.trackId, 'SE')
     .then(function(data) {

      // Send the list of tracks
      t.data = data.body.tracks;
      while (topTracks.filter(t => t.data !== undefined).length === topTracks.length){
        response.send(topTracks);
      }

    }, function(err) {
      console.error(err);
    });  
  });
  
  
});

// Bonus Section!
app.get('/albums', function (request, response) {
  
  //get albums
  spotifyApi.getAlbums(['2fYhqwDWXjbpjaIJPEfKFw', '7drIw3eAGaFbqjAQe9EMYF', '1FmtmLnB1KrXjK0uWLkyhq'])
    .then(function(data) {
      response.send(data.body.albums);
  
  }, function(err) {
    console.error(err);
  });
});// end of .get albums section

//-------------------------------------------------------------//
//------------------------ WEB SERVER -------------------------//
//-------------------------------------------------------------//


// Listen for requests to our app
// We make these requests from client.js
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
