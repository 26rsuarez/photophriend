$(document).ready(function(){
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

//carousel

// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.carousel');
//     var instances = M.Carousel.init(elems, options);
//   });

  // Or with jQuery


    $('.carousel').carousel();
 

  //end carousel
var mykey = "515798d11075abbf042d6d0ba0edef46"
var city = "Austin";
queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+mykey;

//this event listener activates when a user searches for a city
$(document).on("click", "#search-btn", function(event){
    event.preventDefault();
    //the city typed is stored in a variable
    var city = $("#input-box").val().trim();
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


function showWeather(weatherData) {
    //clear the data from previous searches
    $("#weather-data").empty();

    //display the cityname
    var cityName = $("<p>").text(weatherData.name)
    $("#weather-data").append(cityName)
    //temp to farenheight and fixed to one decimal point
    var temp = ((weatherData.main.temp-273.15)*9/5+32).toFixed(1);
    var tempDiv = $("<div>").text("Temp: "+temp+"°F");
    $("#weather-data").append(tempDiv)

    //latitude and longitude in case we need them later on
    var lat = weatherData.coord.lat;
    var lon = weatherData.coord.lon;

    //time of sunrise
    var sunriseTime = new Date(weatherData.sys.sunrise*1000)
    var sunriseHour = sunriseTime.getHours();
    var sunriseMins = sunriseTime.getMinutes();
    var sunriseMins1 = String(sunriseMins).padStart(2, '0');
    var sunriseDiv = $("<div>").text("Sunrise: "+sunriseHour+":"+sunriseMins1+" am");
    $("#weather-data").append(sunriseDiv)

    //time of sunset
    var sunsetTime = new Date(weatherData.sys.sunset*1000)
    var sunsetHour = sunsetTime.getHours();
    var sunsetMins = sunsetTime.getMinutes();
    var sunsetMins1 = String(sunsetMins).padStart(2, '0');
    var sunsetDiv = $("<div>").text("Sunset: "+(sunsetHour-12)+":"+sunsetMins1+" pm");
    $("#weather-data").append(sunsetDiv)


    //cloudy or not?
    var cloudDescription = weatherData.weather[0].description;
    var cloudDiv = $("<div>").text(cloudDescription);
    $("#weather-data").append(cloudDiv)

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



mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYWgtbmd1eWVuIiwiYSI6ImNrZnd3bHprMjFrdGMycnMzZ3NpNXp6bWIifQ.KshsCNOECr3u78WesbqUzQ';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [-97.784,30.294],
zoom: 8
});
 
var marker = new mapboxgl.Marker()
.setLngLat([-97.784,30.294])
.addTo(map);

 });
