$(document).ready(function(){

    // Cars Array
    let cars = ["Tesla", "Lambhorghini", "Lexus", "BMW"]

    // Display Info Function
    function displayCarInfo() {

        var car = $(this).attr("data-name");
        // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + car + "&limit=10"
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        car + "&api_key=dc6zaTOxFJmzC&limit=10";

        // AJAX call
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);

            var results = response.data;
        
            for (var i = 0; i < results.length; i++) {
  
              var carDiv = $("<div class='car'>");
              var rating = results[i].rating;
              var pOne = $("<p>").text("Rating: " + rating);
              carDiv.append(pOne);
    
              var imageUrl = results[i].images.fixed_height.url;
              console.log(imageUrl);
              var carImage = $("<img>");
              carImage.attr("src", imageUrl);
              carImage.attr("alt", "car image");
              carDiv.append(carImage);
    
              $("#gifs-dump").prepend(carDiv);
            }

        });
    }

    // Render Button Function
    function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < cars.length; i++) {

          var a = $("<button>");
          a.addClass("car-btn btn btn-info m-1 text-center mt-2");
          a.attr("data-name", cars[i]);
          a.text(cars[i]);
          $("#buttons-view").append(a);
        }
    }

    // Add a car button function
    $("#add-car").on("click", function(event) {
        event.preventDefault();
        var car = $("#car-input").val().trim();
        cars.push(car);
        renderButtons();

    });

    $(document).on("click", ".car-btn", displayCarInfo);
    renderButtons();

});