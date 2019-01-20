//goodreads API is broken.. they don't use CORS compliant headers in their response and haven't made an update since 2016. looking into Google books API now. (lisa)


var queryURL
var goodReadsResponse

function generateQueryURL(){
  var apiKey = "8s3jRKgwxIUUJ6ZoUo7hQ"
  // save .val of search box as query variable
  var titleQuery = $("#title").val();
  var authorQuery = $("#author").val();
  queryURL = "https://www.goodreads.com/search/index.xml?key=" + apiKey + "&q=" + titleQuery + " " + authorQuery

}

$( "#submit" ).click(function(event) {
  console.log("clickhandler");
  event.preventDefault();
  generateQueryURL();
  clearSearch();
  $.ajax({
    //use saved queryurl for character
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    //save response 
    goodReadsResponse = response
    //show in ui
  });
});

function clearSearch(){
  $("#title").text("");
  $("#author").text("");
};