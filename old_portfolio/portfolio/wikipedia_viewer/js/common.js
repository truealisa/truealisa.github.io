var searchWord = "";
var searchResult = "";

function mySubmit() {
  searchWord = document.getElementById("search_field").value;
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchWord,
    dataType: "jsonp",
    jsonpCallback: "logResults"
  });
};

function logResults(json){
  searchResult = json;
  $("#search_results").html('');
  for (var i=0; i<10; i++) {
    if (searchResult[2][i].indexOf("may refer to") === -1) {
      $("#search_results").append($("<div class='result_item'></div>").html("<h3><a target='_blank' href=" + searchResult[3][i] + ">" + searchResult[1][i] + "</a></h3><p>" + searchResult[2][i] + "</p>"));
    };
  };
  var searchWord = "";
};
