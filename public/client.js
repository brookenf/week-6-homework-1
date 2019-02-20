// client-side js
// run by the browser each time your view template is loaded

$(function() {
    
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
  
//    $.get('/tracks', function(data) {
//     // "Data" is the object we get from the API. See server.js for the function that returns it.
//     console.group('%cResponse from /tracks', 'color: #F037A5; font-size: large');
//     console.log(data);
//     console.groupEnd();
    
//     // The name of the track in 'Audio Features'
//     for(var i = 0; i < data.length; i++) {
//       console.log(data[i].name);
//       var trackTitle = $('<h3>' + data[i].name + '</h3>');
//       trackTitle.appendTo('#audio-features-name'); 
//     }
    
//   });
  
  
  
  fetch('/audio-features').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /audio-features', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Define the variables
    var audioContainer = document.getElementById('audio-features-container');
    var html = '';
    
    // The audio features we want to show
    var keys = ["danceability", "energy", "acousticness", "liveness", "tempo"]
    for(var i = 0; i < data.length; i++) {
      console.log(data[i]);
  
     // Display the audio features
      // keys.map(function(key, j) {
      //   if (data[i].hasOwnProperty(key)) {
      //     html += '<p><span class="big-number">' + data[i][key] + '</span>' + key + '</p>';
      //     audioContainer.innerHTML = html;
      //   }
      // });
    }
    
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
//         var followers = $('<p><span class="big-number">' + noOfFollowers + '</span> followers</p>');
//         followers.appendTo('#artist-container');
      }
      
      // Build the HTML
      artistContainer.innerHTML = html;
    });
  
  
  });
//   $.get('/artist', function(data) {
//     // "Data" is the object we get from the API. See server.js for the function that returns it.
//     console.group('%cResponse from /artist', 'color: #F037A5; font-size: large');
//     console.log(data);
//     console.groupEnd();
    
//     data.map(function(artist, i) {
//       // Display the artist's image
//       var img = $('<img class="circle-image" />');
//       img.attr('src', data[i].images[0].url);
//       img.appendTo('#artist-container');
    
//       // Display the artist name
//       var artistName = $('<h3>' + data[i].name + '</h3>');
//       artistName.appendTo('#artist-container');

//       // Display the artist's genres
//       data[i].genres.map(function(genre, j) {
//         var genreItem = $('<p>' + genre + '</p>');
//         genreItem.appendTo('#artist-container');
//       });
      
//       if (data[i].name == 'Justin Timberlake') {
//         // Display JT's popularity
//         var popularity = $('<p><span class="big-number">#' + data[1].popularity + '</span> in popularity </p>');
//         popularity.appendTo('#artist-container');

//         //Display no of followers JT has
//         var noOfFollowers = data[1].followers.total.toLocaleString();
//         var followers = $('<p><span class="big-number">' + noOfFollowers + '</span> followers</p>');
//         followers.appendTo('#artist-container');
//       }
//     });//end of data.map for artists
//   });
  
  $.get('/artist-top-tracks', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist-top-tracks', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the audio features
    data.map(function(track, i) {
      var trackName = $('<li>' + track.name + '</li>');
      trackName.appendTo('#top-tracks-container');
    });
  });

});
