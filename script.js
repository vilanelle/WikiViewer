$(document).ready(function() {

  // search wiki
  $("form").submit(function(e) {
    e.preventDefault();
  });
  $("#searchBtn").click(function() {
    var searchTerm = $(".form-control").val();

    if (searchTerm) {
      //clear previous results
      $('#result').html('');
      //search
      $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=0&gsrlimit=10&prop=info|extracts&exlimit=10&exchars=200&explaintext=&exintro&inprop=url&gsrsearch=' + searchTerm,
        dataType: 'jsonp',
        success: function(x) {
          // add result to html
          $.each(x.query.pages, function(key, val) {
            console.log(val);
            $("#result").append('<div id="result" class="card"  style="margin-top:1em;"><a href="' + val.fullurl + '"><div class="card-block"><h4 class="card-title">' + val.title + '</h4><p class="card-text">' + val.extract + '</p></div></a></div>');
          });
          // scroll to search results
          $('html, body').animate({
            scrollTop: $("#result").offset().top
          }, 700);
        }
      }); //search
    }
  }); // click

  $("#randomBtn").click(function() {
    //clear previous results
    $('#result').html('');
    $('#searchTerm').val('');
    //get random article
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php?action=query&format=json&generator=random&grnnamespace=0&grnlimit=1&prop=info|extracts&explaintext=&exchars=200&inprop=url',
      dataType: 'jsonp',
      success: function(x) {
        console.log(x.query.pages);
        $.each(x.query.pages, function(key, val) {
          $("#result").append('<div id="result" class="card"><a href="' + val.fullurl + '"><div class="card-block"><h4 class="card-title">' + val.title + '</h4><p class="card-text">' + val.extract + '</p></div></a></div>');
        });
      }
    });
  });

}); //document ready
