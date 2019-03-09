var curLat = "";
var curLong = "";
var weatherInfo = "";
var userTime = new Date().getTime();
var userTimeStr = new Date().getHours() + ":" + (new Date().getMinutes()<10?'0':'') + new Date().getMinutes();
$(".time").html(userTimeStr);
var halfHour = 1800 * 1000;
var tempK = "";
var weatherType = "";

var bgiDB = {
  "clear":{
    "morning": "https://s8.hostingkartinok.com/uploads/images/2017/03/6cb65ed5c47cb80150ab1af95198c12a.jpg",
    "day": "https://s8.hostingkartinok.com/uploads/images/2017/03/b36871d793a1a51701424f73f72e7275.jpg",
    "evening": "https://s8.hostingkartinok.com/uploads/images/2017/03/d8094a29b419e078786f3bb874520d0f.jpg",
    "night": "https://s8.hostingkartinok.com/uploads/images/2017/03/d45b20f77ea6ff9f388f315bcd64c940.jpg"
  },
  "fewClouds":{
    "morning": "https://s8.hostingkartinok.com/uploads/images/2017/03/ff35a58aa6682c1b79b73e8e80b1e5e0.jpg",
    "day": "https://s8.hostingkartinok.com/uploads/images/2017/03/e82966ec633bdc846b53761c460d18c4.jpg",
    "evening": "https://s8.hostingkartinok.com/uploads/images/2017/03/a4456122af8893719f3ed6bfed57397b.jpg",
    "night": "https://s8.hostingkartinok.com/uploads/images/2017/03/224ae1882cbf5044b139e05cc6c438bf.jpg"
  },
  "scatteredClouds":{
    "morning": "https://s8.hostingkartinok.com/uploads/images/2017/03/2d934dd611e3fcfd41925b7031d8e0ea.jpg",
    "day": "https://s8.hostingkartinok.com/uploads/images/2017/03/9ef7884cd000fdf43dd0783781399c57.jpg",
    "evening": "https://s8.hostingkartinok.com/uploads/images/2017/03/9b924d27300d38a424b9309e998a31db.jpg",
    "night": "https://s8.hostingkartinok.com/uploads/images/2017/03/61ee3072053bf82c3cb66f1fe38b3fac.jpg"
  },
  "brokenClouds":{
    "morning": "https://s8.hostingkartinok.com/uploads/images/2017/03/06ab94ecbb12d4912351746bca2e4ce5.jpg",
    "day": "https://s8.hostingkartinok.com/uploads/images/2017/03/919add38109e1ff5e4143c7a0be127a3.jpg",
    "evening": "https://s8.hostingkartinok.com/uploads/images/2017/03/c26395ac3a4789962e2e863991b34fbd.jpg",
    "night": "https://s8.hostingkartinok.com/uploads/images/2017/03/5e54e6184ea12372c7b7a302789b0456.jpg"
  },
  "showerRain":{
    "morning": "https://s8.hostingkartinok.com/uploads/images/2017/03/02fe77b4c4ae7e0f878bf1f19e1870b6.jpg",
    "day": "https://s8.hostingkartinok.com/uploads/images/2018/02/d371c8965c41ff186eda95cfab9a7014.jpg",
    "evening": "https://s8.hostingkartinok.com/uploads/images/2017/03/2d7e9d8d6d99e3c0a86c5bb413431c0d.jpg",
    "night": "https://s8.hostingkartinok.com/uploads/images/2018/02/8bec0c19fb30e46f1fda756843faee97.jpg"
  },
  "rain":{
    "morning": "https://s8.hostingkartinok.com/uploads/images/2017/03/a0724ffa0a1472a57449f7fa5cd9c259.jpg",
    "day": "https://s8.hostingkartinok.com/uploads/images/2017/03/c3e99590bb1b5c1eae2467121fc4ae0f.jpg",
    "evening": "https://s8.hostingkartinok.com/uploads/images/2018/02/03e3324441671bb4522d8449fe458317.jpg",
    "night": "https://s8.hostingkartinok.com/uploads/images/2018/02/9647a879171a03069cbda676a43bd0ed.jpg"
  },
  "thunderstorm":{
    "morning": "https://s8.hostingkartinok.com/uploads/images/2017/03/d4f83fe8261eb55d70a97037c9a4c5ba.jpg",
    "day": "https://s8.hostingkartinok.com/uploads/images/2017/03/23b1485e6b3e7c3c5f5b33f180d96941.jpg",
    "evening": "https://s8.hostingkartinok.com/uploads/images/2017/03/e54af94d7e5b1e4c6ff630c43538286d.jpg",
    "night": "https://s8.hostingkartinok.com/uploads/images/2017/03/8348afd5b719eb9ae6879c14b8f06ff7.jpg"
  },
  "snow":{
    "morning": "https://s8.hostingkartinok.com/uploads/images/2017/03/db93b1c0f319274b46414bf05d5ebb51.jpg",
    "day": "https://s8.hostingkartinok.com/uploads/images/2017/03/f2e98c0e86ecffcd38f4456426c0f510.jpg",
    "evening": "https://s8.hostingkartinok.com/uploads/images/2017/03/5d8dadb4c6cb2a93621e656efedde8cf.jpg",
    "night": "https://s8.hostingkartinok.com/uploads/images/2017/03/f8a2ac8b9391b319dd8440fd3fcdf30e.jpg"
  },
  "mist":{
    "morning": "https://s8.hostingkartinok.com/uploads/images/2017/03/5bb14330b9b998c22ac93491fd24e2d0.jpg",
    "day": "https://s8.hostingkartinok.com/uploads/images/2017/03/ea13c01de38e0ca493982f2fb81d50a7.jpg",
    "evening": "https://s8.hostingkartinok.com/uploads/images/2017/03/c0c07d99e65fe5b3e0346c8a0b4ff3fe.jpg",
    "night": "https://s8.hostingkartinok.com/uploads/images/2017/03/e8ed5147437619e1f263971c2816d415.jpg"
  }
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    curLat = position.coords.latitude;
    curLong = position.coords.longitude;
    var requestStr = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?APPID=37db746aae5bb4a341eae82a42c0ad28&lat=" + curLat + "&lon=" + curLong;
    $.getJSON(requestStr, function(json){
      weatherInfo = json;
      $(".location").html(weatherInfo.name + ", " + weatherInfo.sys.country);
      tempK = weatherInfo.main.temp;
      weatherType = weatherInfo.weather[0].main;
      $(".weather").html(weatherType + "<br>" + (Math.round(tempK - 273.15)) + " °C <span onclick=\"exchangeTemp()\">to °F</span>");
      var sunRise = weatherInfo.sys.sunrise * 1000;
      var sunSet = weatherInfo.sys.sunset * 1000;
      if (userTime < sunRise - halfHour || userTime > sunSet + halfHour) {
        console.log("Night");
        if (weatherInfo.weather[0].id <= 232) {
          $("body").css("background-image", "url('" + bgiDB.clear.night + "')");
        };
        if ((weatherInfo.weather[0].id >= 300 && weatherInfo.weather[0].id <= 321) || (weatherInfo.weather[0].id >= 520 && weatherInfo.weather[0].id <= 531)) {
          $("body").css("background-image", "url('" + bgiDB.showerRain.night + "')");
        };
        if (weatherInfo.weather[0].id >= 500 && weatherInfo.weather[0].id <= 504) {
          $("body").css("background-image", "url('" + bgiDB.rain.night + "')");
        };
        if ((weatherInfo.weather[0].id >= 600 && weatherInfo.weather[0].id <= 622) || weatherInfo.weather[0].id === 511) {
          $("body").css("background-image", "url('" + bgiDB.snow.night + "')");
        };
        if (weatherInfo.weather[0].id >= 701 && weatherInfo.weather[0].id <= 781) {
          $("body").css("background-image", "url('" + bgiDB.mist.night + "')");
        };
        if (weatherInfo.weather[0].id === 800) {
          $("body").css("background-image", "url('" + bgiDB.clear.night + "')");
        };
        if (weatherInfo.weather[0].id === 801) {
          $("body").css("background-image", "url('" + bgiDB.fewClouds.night + "')");
        };
        if (weatherInfo.weather[0].id === 802) {
          $("body").css("background-image", "url('" + bgiDB.scatteredClouds.night + "')");
        };
        if (weatherInfo.weather[0].id === 803 || weatherInfo.weather[0].id === 804) {
          $("body").css("background-image", "url('" + bgiDB.brokenClouds.night + "')");
        };
      } else if (userTime > sunRise + halfHour && userTime < sunSet - halfHour) {
        console.log("Day");
        if (weatherInfo.weather[0].id <= 232) {
          $("body").css("background-image", "url('" + bgiDB.clear.day + "')");
        };
        if ((weatherInfo.weather[0].id >= 300 && weatherInfo.weather[0].id <= 321) || (weatherInfo.weather[0].id >= 520 && weatherInfo.weather[0].id <= 531)) {
          $("body").css("background-image", "url('" + bgiDB.showerRain.day + "')");
        };
        if (weatherInfo.weather[0].id >= 500 && weatherInfo.weather[0].id <= 504) {
          $("body").css("background-image", "url('" + bgiDB.rain.day + "')");
        };
        if ((weatherInfo.weather[0].id >= 600 && weatherInfo.weather[0].id <= 622) || weatherInfo.weather[0].id === 511) {
          $("body").css("background-image", "url('" + bgiDB.snow.day + "')");
        };
        if (weatherInfo.weather[0].id >= 701 && weatherInfo.weather[0].id <= 781) {
          $("body").css("background-image", "url('" + bgiDB.mist.day + "')");
        };
        if (weatherInfo.weather[0].id === 800) {
          $("body").css("background-image", "url('" + bgiDB.clear.day + "')");
        };
        if (weatherInfo.weather[0].id === 801) {
          $("body").css("background-image", "url('" + bgiDB.fewClouds.day + "')");
        };
        if (weatherInfo.weather[0].id === 802) {
          $("body").css("background-image", "url('" + bgiDB.scatteredClouds.day + "')");
        };
        if (weatherInfo.weather[0].id === 803 || weatherInfo.weather[0].id === 804) {
          $("body").css("background-image", "url('" + bgiDB.brokenClouds.day + "')");
        };
      } else if ((userTime >= sunRise - halfHour && userTime <= sunRise + halfHour) || userTime === sunRise) {
        console.log("Morning");
        if (weatherInfo.weather[0].id <= 232) {
          $("body").css("background-image", "url('" + bgiDB.clear.morning + "')");
        };
        if ((weatherInfo.weather[0].id >= 300 && weatherInfo.weather[0].id <= 321) || (weatherInfo.weather[0].id >= 520 && weatherInfo.weather[0].id <= 531)) {
          $("body").css("background-image", "url('" + bgiDB.showerRain.morning + "')");
        };
        if (weatherInfo.weather[0].id >= 500 && weatherInfo.weather[0].id <= 504) {
          $("body").css("background-image", "url('" + bgiDB.rain.morning + "')");
        };
        if ((weatherInfo.weather[0].id >= 600 && weatherInfo.weather[0].id <= 622) || weatherInfo.weather[0].id === 511) {
          $("body").css("background-image", "url('" + bgiDB.snow.morning + "')");
        };
        if (weatherInfo.weather[0].id >= 701 && weatherInfo.weather[0].id <= 781) {
          $("body").css("background-image", "url('" + bgiDB.mist.morning + "')");
        };
        if (weatherInfo.weather[0].id === 800) {
          $("body").css("background-image", "url('" + bgiDB.clear.morning + "')");
        };
        if (weatherInfo.weather[0].id === 801) {
          $("body").css("background-image", "url('" + bgiDB.fewClouds.morning + "')");
        };
        if (weatherInfo.weather[0].id === 802) {
          $("body").css("background-image", "url('" + bgiDB.scatteredClouds.morning + "')");
        };
        if (weatherInfo.weather[0].id === 803 || weatherInfo.weather[0].id === 804) {
          $("body").css("background-image", "url('" + bgiDB.brokenClouds.morning + "')");
        };
      } else if ((userTime >= sunSet - halfHour && userTime <= sunSet + halfHour) || userTime === sunSet) {
        console.log("Evening");
        if (weatherInfo.weather[0].id <= 232) {
          $("body").css("background-image", "url('" + bgiDB.clear.evening + "')");
        };
        if ((weatherInfo.weather[0].id >= 300 && weatherInfo.weather[0].id <= 321) || (weatherInfo.weather[0].id >= 520 && weatherInfo.weather[0].id <= 531)) {
          $("body").css("background-image", "url('" + bgiDB.showerRain.evening + "')");
        };
        if (weatherInfo.weather[0].id >= 500 && weatherInfo.weather[0].id <= 504) {
          $("body").css("background-image", "url('" + bgiDB.rain.evening + "')");
        };
        if ((weatherInfo.weather[0].id >= 600 && weatherInfo.weather[0].id <= 622) || weatherInfo.weather[0].id === 511) {
          $("body").css("background-image", "url('" + bgiDB.snow.evening + "')");
        };
        if (weatherInfo.weather[0].id >= 701 && weatherInfo.weather[0].id <= 781) {
          $("body").css("background-image", "url('" + bgiDB.mist.evening + "')");
        };
        if (weatherInfo.weather[0].id === 800) {
          $("body").css("background-image", "url('" + bgiDB.clear.evening + "')");
        };
        if (weatherInfo.weather[0].id === 801) {
          $("body").css("background-image", "url('" + bgiDB.fewClouds.evening + "')");
        };
        if (weatherInfo.weather[0].id === 802) {
          $("body").css("background-image", "url('" + bgiDB.scatteredClouds.evening + "')");
        };
        if (weatherInfo.weather[0].id === 803 || weatherInfo.weather[0].id === 804) {
          $("body").css("background-image", "url('" + bgiDB.brokenClouds.evening + "')");
        };
      };
    });
  });
} else {
  $("body").html("You need to update your browser to use this aplication :(")
};

var counter = 0;

function exchangeTemp() {
  if (counter === 0) {
    $(".weather").html(weatherType + "<br>" + Math.round(tempK * 9/5 - 459.67) + " °F <span onclick=\"exchangeTemp()\">to °C</span>");
    counter += 1;
  } else {
    $(".weather").html(weatherType + "<br>" + Math.round(tempK - 273.15) + " °C <span onclick=\"exchangeTemp()\">to °F</span>");
    counter -= 1;
  }
};
