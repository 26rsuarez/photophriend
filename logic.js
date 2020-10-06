var mykey = "515798d11075abbf042d6d0ba0edef46"
var city = "Austin";
queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+mykey;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(showWeather);

function showWeather(weatherData) {
    console.log(weatherData)
    //temp to farenheight and fixed to one decimal point
    var temp = ((weatherData.main.temp-273.15)*9/5+32).toFixed(1);
    console.log(temp);

    //latitude and longitude in case we need them later on
    var lat = weatherData.coord.lat;
    var lon = weatherData.coord.lon;

    //time of sunrise
    var sunriseTime = new Date(weatherData.sys.sunrise*1000)
    var sunriseHour = sunriseTime.getHours();
    var sunriseMins = sunriseTime.getMinutes();
    console.log(sunriseHour+":"+sunriseMins+"am");

    //time of sunset
    var sunsetTime = new Date(weatherData.sys.sunset*1000)
    var sunsetHour = sunsetTime.getHours();
    var sunsetMins = sunsetTime.getMinutes();
    console.log(sunsetHour-12+":"+sunsetMins+"pm");

    //cloudy or not?
    var cloudDescription = weatherData.weather[0].description;
    console.log(cloudDescription);

}

