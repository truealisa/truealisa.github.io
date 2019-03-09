var randomQuote = "";

function logResults(json){
  randomQuote = json;
  $(".quote").html(randomQuote.content);
  $(".author").html(randomQuote.author["name"]);
};

function postTweet() {
  window.open('https://twitter.com/intent/tweet?hashtags=quotes&text=' + '\"' + encodeURIComponent(randomQuote.content) + '\"' + ' ' + encodeURIComponent(randomQuote.author["name"]), 'newwindow', 'width=500, height=450, top=130, left=450');
  return false;
};

$(document).ready(function(){
  $.ajax({
    url: "https://wisdomapi.herokuapp.com/v1/random",
    dataType: "jsonp",
    jsonpCallback: "logResults"
  });
});

$("#get-new-quote").on('click', function(){
  $.ajax({
    url: "https://wisdomapi.herokuapp.com/v1/random",
    dataType: "jsonp",
    jsonpCallback: "logResults"
  });
});
