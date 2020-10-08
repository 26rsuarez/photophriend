$(document).ready(function(){

    var cities = [];
    var lastCities

var photoTips = [
    "Keep a dog treat handy to draw a dog's attention for great photos of an attentive, furry friend!",
    "In landscape photography, you'll want a high f/stop to make sure everything is in focus.",
    "A tripod is advisable anytime you are dropping the shutter speed below 1/60th of a second",
    "Stars move!  Keep the shutter speed at a max of 30 seconds to keep them crystal clear for night sky photos.",
    "Stars move!  Want proof?  Try out a long exposure shot. (Some cameras will let you go as high as 30 minutes!)",
    "Taking a portrait?  Put the top of the subject's head about a third away from the top of the photo.",
    "Rule of thirds: frame a photo to where changes in action, shadow, or subject happens in 1/3 intervals for engaging photos.",
    "Taking a portrait?  Set your focus point on the eyes.",
    "Taking a portrait?  Keep that f/stop low for a beautifully blurred background.  But watch your focus!",
    "Taking an action shot?  Crank the shutter speed up to freeze the action",
    "Taking an action shot?  Drop the shutter speed down to create a motion blur effect.",
    "A high ISO will let you shoot in low light, but the photo will be noisier (think of your phone's camera in low light).",
    "A low ISO creates a very sharp photo, but it requires more light or longer shutter speeds.",
    "The f/stop controls how much light the lens lets in.  Think of it like a pupil.  Low number is like a dialated pupil.",
    "The lower the f/stop, the more background blur.  A high f/stop will keep the entire scene in focus."
];

//button click
$(".tip-button").on("click", function () {
    var random = photoTips[Math.floor(Math.random() * (photoTips.length - 1))]
    console.log(random)
    $("#fact-text").html(random);


})
//these messages will be displayed under todays weather information, for day and night
var weatherMessages = {

        "01d": "Bright light lets you use a fast shutter speed!",
        "01n": "Great night for moon or star photos!",
    
        "02d": "Treat it like a sunny day, but watch your light meter!",
        "02n": "You should be able to find a clear patch of sky.",
    
        "03d": "Good cloud cover today!  Direct light won't be an issue.",
        "03n": "Sky's not giving you anything tonight.",
   
        "04d": "Be ready to adapt!  Light could change quickly.",
        "04n": "Probably a slow night.  Might get some cool moonlight shots.",
    
        "09d": "Always protect your gear!  Cameras don't do well wet.",
        "09n": "Always protect your gear!  Cameras don't do well wet.",
  
        "10d": "Always protect your gear!  Cameras don't do well wet.",
        "10n": "Always protect your gear!  Cameras don't do well wet.",
  
    
        "11d": "Stay inside! But long exposure shots are great for catching lightning.",
        "11n": "Stay inside! But long exposure shots are great for catching lightning.",
    
    
        "13d": "Snow reflects a lot of light.  Watch your light meter!",
        "13n": "Just can't beat a moonlit snow scene with a long exposure",
   
    
        "50d": "Mind your gear!  But misty days have a dream like quality.",
        "50n": "What's on TV tonight?"
}


//carousel

// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.carousel');
//     var instances = M.Carousel.init(elems, options);
//   });

  // Or with jQuery


$('.carousel').carousel();
  //end carousel
var lat;
var lon;
city="Austin";
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYWgtbmd1eWVuIiwiYSI6ImNrZnd3bHprMjFrdGMycnMzZ3NpNXp6bWIifQ.KshsCNOECr3u78WesbqUzQ';

//hide today and five day forecast on the page
$("#today-display").hide();
$("#five-day-display").hide();


//this event listener activates when a user searches for a city
$(document).on("click", "#search-btn", function(event){
    event.preventDefault();
    //the city typed is stored in a variable
    var city = $("#input-box").val().trim();
    //push the city to the array
    cities.push(city);
    console.log(cities);
    localStorage.setItem("savedArray", JSON.stringify(cities))
    renderButtons()
    //clear the input-box
    $("#input-box").val("");
    //call openweathermap with the city
    var mykey = "515798d11075abbf042d6d0ba0edef46"
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+mykey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(showWeather);
    showFiveDay(city);
    
})

//event listener for buttons created
$(document).on("click", ".city-btn", function() {
    var city = $(this).attr("data-name");
    var mykey = "515798d11075abbf042d6d0ba0edef46"
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+mykey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(showWeather);
    showFiveDay(city);
});

function cityMap(lat, lon) {
    // map of the searched city 
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lon, lat],
        zoom: 8
    });

    //marker for the searched city
    var marker = new mapboxgl.Marker()
    .setLngLat([lon, lat])
    .addTo(map);
}



function renderButtons() {
    // clearing city button before creating new ones
    $("#city-buttons").empty();

    //if the array is stored in the local storage the old buttons will be created
    //this will also call the showweather and fiveday forecast funtion on the last item
    if (localStorage.getItem("savedArray")!==null) {
      var savedArray = localStorage.getItem("savedArray")
     searchHistory = JSON.parse(savedArray);
      var lastCities = searchHistory[searchHistory.length-1];
      console.log(cities);
      cities = [lastCities]
    }
    // Looping through the array of movies
    for (var i = 0; i < cities.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array
      var cityButton = $("<button>");
      cityButton.addClass("city-btn");
      // Adding a data-attribute
      cityButton.attr("data-name", cities[i]);
      // Providing the text
      cityButton.text(cities[i]);
      // Adding the button to the buttons-area div
      $("#city-buttons").prepend(cityButton);
    }
}

function showWeather(weatherData) {
    //clear the data from previous searches
    $("#city-name").empty();
    $("#temperature").empty();
    $("#sunrise").empty();
    $("#sunset").empty();
    $("#description").empty();
    $("#message").empty();

    //show today and five day forecast on the page
    $("#today-display").show();
    $("#five-day-display").show();

    //display the cityname
    $("#city-name").text(weatherData.name)
    
    //temp to farenheight and fixed to one decimal point
    var temp = ((weatherData.main.temp-273.15)*9/5+32).toFixed(1);
    $("#temperature").text("Temp: "+temp+"°F");
    

    //latitude and longitude in case we need them later on
    var lat = weatherData.coord.lat;
    var lon = weatherData.coord.lon;
    cityMap(lat, lon);

    //time of sunrise
    var sunriseTime = new Date(weatherData.sys.sunrise*1000)
    var sunriseHour = sunriseTime.getHours();
    var sunriseMins = sunriseTime.getMinutes();
    var sunriseMins1 = String(sunriseMins).padStart(2, '0');
    $("#sunrise").text("Sunrise: "+sunriseHour+":"+sunriseMins1+" am");
    

    //time of sunset
    var sunsetTime = new Date(weatherData.sys.sunset*1000)
    var sunsetHour = sunsetTime.getHours();
    var sunsetMins = sunsetTime.getMinutes();
    var sunsetMins1 = String(sunsetMins).padStart(2, '0');
    $("#sunset").text("Sunset: "+(sunsetHour-12)+":"+sunsetMins1+" pm");
    


    //cloudy or not?
    var cloudDescription = weatherData.weather[0].description;
    $("#description").text(cloudDescription);

    //icon and message
    var iconPic = weatherData.weather[0].icon;
    $("#icon-image").attr("src","https://openweathermap.org/img/wn/" +iconPic+ "@2x.png");

    
    var message = weatherMessages[iconPic];
    $("#message").text(message);
}

function showFiveDay(city) {
    var api = "515798d11075abbf042d6d0ba0edef46";
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+api;
    $.ajax({
        url: queryUrl,
        type: "Get"
    }).then(function(response){

    // the object returned has 40 arrays with the day changing every 8 arrays
    for (var i=0; i<40; i+=8) {
        //clear the div text first
        var divId = "#Forecast" + i;
        $(divId).empty();
        //the date is in the object but it needs to be parsed
        var defaultDate = response.list[i].dt_txt;
        var dateNeeded = defaultDate.split(" ");
        var dateParsed = dateNeeded[0].split("-");
        var year = dateParsed[0];
        var month = dateParsed[1];
        var day = dateParsed[2];

        //other variables needed from the object
        var temperatureK = response.list[i].main.temp;
        var temperatureF = (temperatureK-273.15)*9/5+32;

        // then the important variables are added to the html
        var date = $("<p>").text(month+"/"+day+"/"+year);
        //the icon can be obtained from the object and the website
        var icon = $("<img>").attr("src","https://openweathermap.org/img/wn/" +response.list[i].weather[0].icon+ "@2x.png");

        var temp = $("<p>").text("Temp: "+temperatureF.toFixed(1)+"°F");
        
        $(divId).append(date,icon,temp);
    }
})
}

// // default location shown on map- Austin 
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYWgtbmd1eWVuIiwiYSI6ImNrZnd3bHprMjFrdGMycnMzZ3NpNXp6bWIifQ.KshsCNOECr3u78WesbqUzQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-97.72, 30.27],
    zoom: 8
});

var marker = new mapboxgl.Marker()
    .setLngLat([-97.72, 30.27])
    .addTo(map);

renderButtons();

})
