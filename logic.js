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

