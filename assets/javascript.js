

var queryURL
var goodReadsResponse

function generateQueryURL(){
  // save .val of search box as query variable
  var titleQuery = $("#title").val();
  queryURL =  "https://www.googleapis.com/books/v1/volumes?q=" + titleQuery + "&callback=handleResponse"
  console.log(queryURL);
}

function handleResponse(response){
  //save response 
  booksResponse = response
  console.log(response)
  for (var i = 0; i < response.items.length; i++) {
    var item = response.items[i];
    // in production code, item.text should have the HTML entities escaped.
    document.getElementById("content").innerHTML += "<br>" + item.volumeInfo.title;  
  }
}


$( "#submit" ).click(function(event) {
  console.log("clickhandler");
  event.preventDefault();
  generateQueryURL();
  clearSearch();
  $.ajax({
    //use saved queryurl 
    url: queryURL,
    method: "GET",
    dataType: "jsonp",
  }).then(handleResponse);
});
  


function clearSearch(){
  $("#title").text("");
};