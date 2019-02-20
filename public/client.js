// client-side js
// run by the browser each time your view template is loaded

    
fetch('/search-track').then(resp => resp.json()).then((data) => {
  // "Data" is the object we get from the API. See server.js for the function that returns it.
  console.group('%cResponse from /search-track', 'color: #F037A5; font-size: large');
  console.log(data);
  console.groupEnd();

 // Define variables
  var html = '';
  var searchContainer = document.getElementById('search-track-container');

  //Get Name of Song & link to it on Spotify
  html += `<h3><a href="${data.external_urls.spotify}" target="_blank">${data.name}</a></h3>`;

  // Display the artist name
  var artists = '';
  data.artists.forEach(function(artist) {
    artists = artists + artist.name + ' <br>' ;
  });
  html += '<h5>' + artists + '</h5> ';

  // Display the album art
  var img = `<img src="${data.album.images[0].url}"/>`;
  html += img;

  //build the HTML
  searchContainer.innerHTML = html;
});


fetch('/category-playlists').then(resp => resp.json()).then((data) => {
  // "Data" is the object we get from the API. See server.js for the function that returns it.
  console.group('%cResponse from /category-playlists', 'color: #F037A5; font-size: large');
  console.log(data);
  console.groupEnd();

  // Define variables
  var catId = document.getElementById('category-playlists-container');
  var html = '';

  //loop through data
  data.forEach(function(c){
    html  += `<br/><h1>${c.name}</h1><br/>`;
    c.data.playlists.items.map(function(playlist, i) { 
      var img = `<img class="cover-image" src="${playlist.images[0].url}" />`;
      html += img;
      catId.innerHTML = html;
    });
  });
});

fetch('/audio-features').then(resp => resp.json()).then((data) => {
  // "Data" is the object we get from the API. See server.js for the function that returns it.
  console.group('%cResponse from /audio-features', 'color: #F037A5; font-size: large');
  console.log(data);
  console.groupEnd();

  // Define the variables
  var audioContainer = document.getElementById('audio-features-container');
  var html = '';
  
  // Fetch the names of the songs
  fetch('/tracks').then(resp => resp.json()).then((data2) => {
   // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /tracks', 'color: #F037A5; font-size: large');
    console.log(data2);
    console.groupEnd(); 
    
    var songs = [];
    
    // Get the track names
    data2.forEach((track) => {
      songs.push(track.name);
    });
    
    // The audio features we want to show
    var keys = ["danceability", "energy", "acousticness", "liveness", "tempo"]

    //getting the names mapped and the keys mapped
    songs.forEach((song) => {
      html += `<h3>${song}</h3>`;
      for(var i = 0; i < data.length; i++) {
            keys.forEach((key) =>{
              html += `<p><span class="big-number">${data[i][key]}</span> ${key}</p>`;
            });
        audioContainer.innerHTML = html;    
      }    
    });
  });
});


fetch('/artist').then(resp => resp.json()).then((data) => {
  // "Data" is the object we get from the API. See server.js for the function that returns it.
  console.group('%cResponse from /artist', 'color: #F037A5; font-size: large');
  console.log(data);
  console.groupEnd();

  // Define variables
  var html = '';
  var artistContainer = document.getElementById('artist-container');

  // Display the artist's image
  data.map(function(artist, i) {
    var img = `<img class="circle-image" src="${data[i].images[0].url}" alt="${data[i].name}'s image"/>`;
    html += img;

    // Display the artist's genres
    data[i].genres.map(function(genre, j) {
      var genreItem = `<p>${genre}</p>`;
      html += genreItem;
    });

    // Set some conditional logic for information to only show on JT
    if (data[i].name == 'Justin Timberlake') {
      // Display JT's popularity
      var popularity = `<p><span class="big-number">#${data[1].popularity}</span> in popularity</p>`;
      html += popularity;

      //Display no of followers JT has
      var noOfFollowers = data[1].followers.total.toLocaleString();
      var followers = `<p><span class="big-number">${noOfFollowers}</span> followers</p>`;
      html += followers;
    }

    // Build the HTML
    artistContainer.innerHTML = html;
  });


});

fetch('/artist-top-tracks').then(resp => resp.json()).then((data) => {
// "Data" is the object we get from the API. See server.js for the function that returns it.
  console.group('%cResponse from /artist-top-tracks', 'color: #F037A5; font-size: large');
  console.log(data);
  console.groupEnd();
  
  // Define the variables
  var topTracksContainer = document.getElementById('top-tracks-container');
  var html = '';
  
  // Display the artists names
  data.forEach((t) => {
    html += `<h3>${t.name}</h3>`;
    var trackNames = t.data;
    trackNames.forEach((song) => {
      html += `<li>${song.name}</li>`;
    });
    topTracksContainer.innerHTML = html;
  });
});

//     // Display the audio features
//     data.map(function(track, j) {
//       var trackName = $('<li>' + track.name + '</li>');
//         trackName.appendTo('#top-tracks-container');
//       });
//   });//end of .get artist top tracks

//bonus section
fetch('/albums').then(resp => resp.json()).then((data) => {
 //"Data" is the object we get from the API. See server.js for the function that returns it.
  console.group('%cResponse from /albums', 'color: #F037A5; font-size: large');
  console.log(data);
  console.groupEnd();
  
  // Define the variables 
  var html = '';
  var bonusContainer = document.getElementById('bonus-container');
  
  // map the data array
  data.map(function(album, i) {
    // Get album covers
    var albumContainer = `<br/><img src="${album.images[0].url}"/><h3 class="bonus-name">${album.name}</h3>`;
    html += albumContainer;
    var tracks = album.tracks.items;
    tracks.forEach(function(track) {
      var trackNames = `<li>${track.name}</li>`;
      html += trackNames;
    });
    bonusContainer.innerHTML = html;
  });
});