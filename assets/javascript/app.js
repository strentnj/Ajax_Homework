  // Initial array of movies
  var movies = ['Clueless', 'Mission Impossible', 'Uncle Buck', 'Steel Magnolias', 'Legally Blonde', 'Neighbors', 
  'A League of Their Own', 'Back to the Future', '16 Candles', 'Pretty in Pink'];

  // ========================================================

  function displaymovieInfo(){

    
    $('#moviesView').empty();     

    var movie = $(this).attr('data-name');

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({url: queryURL, method: 'GET'})
       .done(function(response) {
           var results = response.data;

           for(var i=0; i < results.length; i++){


              if (results[i].rating == "r" || results[i].rating == "pg-13")
              {

              }
              else {
             
               console.log(response)


               var rating = results[i].rating;

               var p = $('<p>').text( "Rating: " + rating);

               var movieImage = $('<img>');
               
               movieImage.attr('src', results[i].images.fixed_height_still.url);
               movieImage.attr('data-still', results[i].images.fixed_height_still.url);
               movieImage.attr('data-animate', results[i].images.fixed_height.url);
               movieImage.attr('data-state', 'still');
               movieImage.addClass('movieImage');
               

               $('#moviesView').append(p);
               $('#moviesView').append(movieImage);
              }

           }

      $('.movieImage').on('click', function(){
        
          var state = $(this).attr('data-state'); 
            console.log(state);
         
            if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
           
      });

        
      });   

  }

  
  // ========================================================

  function renderButtons(){ 

    
    $('#buttonsView').empty();

    for (var i = 0; i < movies.length; i++){


        var a = $('<button>') 
        a.addClass('movie'); 
        a.addClass("btn btn-success"); 
        a.addClass("btn btn-primary btn-lg");
        a.attr('data-name', movies[i]); 
        a.text(movies[i]); 
        $('#buttonsView').append(a);
    }
  }

  // ========================================================


  $('#addmovie').on('click', function(){

    var movie = $('#movie-input').val().trim();

    movies.push(movie);
    
    renderButtons();

    return false;
  })

  // ========================================================

  $(document).on('click', '.movie', displaymovieInfo);

  // ========================================================
  renderButtons();
 