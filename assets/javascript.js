

var queryURL
var goodReadsResponse

function generateQueryURL(){
  // save .val of search box as query variable
  var titleQuery = $("#title").val();
  queryURL =  "https://www.googleapis.com/books/v1/volumes?q=" + titleQuery + "&callback=handleResponse"
  console.log(queryURL);
}

//bind dynamically generated items

function handleResponse(response){
  //save response 
  booksResponse = response
  console.log(response)
  $("#searchResults").html("");
  $(".results").html("");
  $(".results").append("<div class='row'><h6>Results</h6></div>");
  for (var i = 0; i < 3; i++) {
    var item = booksResponse.items[i];
    // show title, author, and image in UI 
    $("#searchResults").append("<div class='col s4'> <div class='card horizontal bookSearchCard'>  <div class='card-image book-image'> <img src="+item.volumeInfo.imageLinks.smallThumbnail+"/></div> <div class='card-stacked'> <div class='card-content'><p class='title'>"+ item.volumeInfo.title + "</p> <p>" + item.volumeInfo.authors[0]+"</p>");  
  }
  bindcards();
}

function bindcards(){
  $('.bookSearchCard').off();
  
  //click handler to load youtube videos 
  $( ".bookSearchCard" ).click(function() {
    console.log('search result chosen handler');
    generateYoutubeURL(this);
    
});
}

$( "#submit" ).click(function(event) {
  console.log("search clickhandler");
  $("#player").html("");
  $(".videoresults").html("");

  event.preventDefault();
  generateQueryURL();
  youtubeVideoIDs = [];
  generateYoutubeURLs();

  
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
var youtubeVideoIDs = [];
function generateYoutubeURLs(){
  var titleQuery = $("#title").val();
  youtubeQueryURL =  "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBezsbgbsQEgpKlzTboqd7ynYrVSJvKDZg&part=id&maxResults=3&q=" + titleQuery;

  $.ajax({
    url: youtubeQueryURL,
    method: "GET"
  })
  .then(function(response) {
    console.log(response);
    console.log(response.items[0].id.videoId);
    youtubeVideoIDs[0] = response.items[0].id.videoId;
  })

  titleQuery = $("#title").val();
  youtubeQueryURL =  "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBezsbgbsQEgpKlzTboqd7ynYrVSJvKDZg&part=id&maxResults=3&q=" + titleQuery + "+book+review";

  $.ajax({
    url: youtubeQueryURL,
    method: "GET"
  })
  .then(function(response) {

    console.log(response);
    console.log(response.items[0].id.videoId);
    youtubeVideoIDs[1] = response.items[0].id.videoId;
  })

  titleQuery = $("#title").val();
  youtubeQueryURL =  "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBezsbgbsQEgpKlzTboqd7ynYrVSJvKDZg&part=id&maxResults=3&q=" + titleQuery + "+movie";


  $.ajax({
    url: youtubeQueryURL,
    method: "GET"
  })
  .then(function(response) {

    console.log(response);
    console.log(response.items[0].id.videoId);
    youtubeVideoIDs[2] = response.items[0].id.videoId;
  })
};


//click handler to load youtube videos 
$( "#searchResults" ).click(function() {
  $(".videoresults").append("<div class='row'><h6>Related Videos:</h6></div>");


    $(".videoresults").append("<div class='row'><h6>Related Videos:</h6></div>");

    for (let i = 0; i < 3; i++) {
      var videoID = youtubeResponse.items[i]
      var player = $('<div class="col s4"><div class="card"><div class="card-image video"><iframe id="ytplayer" type="text/html" width="200" height="" src="https://www.youtube.com/embed/' + videoID.id.videoId +'?autoplay=0&origin=http://example.com"frameborder="0"></iframe></div></div></div>');
      $('#player').append(player);
    }
});
