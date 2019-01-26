

var queryURL
var goodReadsResponse

function generateQueryURL(){
  // save .val of search box as query variable
  var titleQuery = $("#title").val();
  queryURL =  "https://www.googleapis.com/books/v1/volumes?q=" + titleQuery + "&callback=handleResponse"
  console.log(queryURL);
}

function handleResponse(response){
  clearSearch();
  //save response 
  booksResponse = response
  console.log(response)
  for (var i = 0; i < 3; i++) {
    var item = response.items[i];
    // show title, author, and image in UI 
    $("#searchResults").append("<div class='col s4'> " + item.volumeInfo.title + "<br>" + item.volumeInfo.authors[0]+ "<br>" + "<img src="+item.volumeInfo.imageLinks.smallThumbnail+"/></div>");  
  }
}


$( "#submit" ).click(function(event) {
  console.log("clickhandler");
  event.preventDefault();
  generateQueryURL();
  generateYoutubeURL();
  clearSearch();
  $.ajax({
    //use saved queryurl 
    url: queryURL,
    method: "GET",
    dataType: "jsonp",
  }).then(handleResponse);
});
  


function clearSearch(){
  console.log('clearhandler')
  $("#title").val("");
}

//get youtube video id relative to book being searched
var youtubeQueryURL 
var youtubeResponse
var youtubeVideoID;
function generateYoutubeURL(){
  var titleQuery = $("#title").val();
    youtubeQueryURL =  "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBezsbgbsQEgpKlzTboqd7ynYrVSJvKDZg&part=id&maxResults=3&q=" + titleQuery;

  $.ajax({
    url: youtubeQueryURL,
    method: "GET"
  })
  .then(function(response) {
      console.log(response);
      console.log(response.items[0].id.videoId);
      youtubeVideoID = response.items[0].id.videoId;
  })
  
};

//click handler to load youtube videos 
$( "#searchResults" ).click(function() {
  var player = $('<iframe id="ytplayer" type="text/html" width="640" height="360" src="https://www.youtube.com/embed/' + youtubeVideoID + '?autoplay=1&origin=http://example.com" frameborder="0"></iframe>');
  $('#player').append(player);
});