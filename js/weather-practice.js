const APP_ID = '62c4f204abb63f5866b89a6d1cb21469';

function displayWeather(weather) {
    document.getElementById("meteo").innerHTML = weather.weather[0].description;
    document.getElementById("temperature").innerHTML = weather.main.temp + "°C";
    document.getElementById("ville").innerHTML = weather.name;
}

function displayForecast(forecast) {
    document.getElementById("jour").innerHTML = "";
    for (var i=1; i<forecast.list.length; i++) {
        var newDay = document.createElement("div");
        newDay.setAttribute("class", "row");
     
        var weekDay = document.createElement("div");
        weekDay.setAttribute("class", "col");
        weekDay.innerHTML = moment(forecast.list[i].dt *1000).format('dddd');
        
        var newTemp = document.createElement("div");
        newTemp.setAttribute("class", "col right");
        newTemp.innerHTML = forecast.list[i].temp.max + "°/ " + forecast.list[i].temp.min + "°";;
        
        var newIcon = document.createElement("div");
        newIcon.setAttribute("class", "col");
        
        var newImage = document.createElement("img");
        newImage.setAttribute("src", "http://openweathermap.org/img/w/" + forecast.list[i].weather[0].icon + ".png");
        newImage.setAttribute("class", "miniweather");
       
        
        newIcon.appendChild(newImage)
        newDay.appendChild(weekDay)
        newDay.appendChild(newTemp)
        newDay.appendChild(newIcon)
        document.getElementById("jour").appendChild(newDay);
    }
}

    /*console.log(forecast);
    document.getElementById("day1").innerHTML = moment(forecast.list[1].dt *1000).format('dddd'); 
    document.getElementById("temp1").innerHTML = forecast.list[1].temp.max + "°/ " + forecast.list[1].temp.min + "°";
    document.getElementById("icon1").src = 'http://openweathermap.org/img/w/' + forecast.list[1].weather[0].icon +'.png';*/

function getWeather(position){
    const req = new XMLHttpRequest();

    req.onreadystatechange = function(event) {
        // XMLHttpRequest.DONE === 4
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                const weather = JSON.parse(this.responseText);
                displayWeather(weather)
            } else {
                console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
            }
        }
    };

    req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&units=metric&appid=' + APP_ID + '&lang=fr', true);
    req.send(null);
}

function success(position){
    console.log(position)
    getWeather(position);
    getForecast(position);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, function(err){
            console.log(err)
            getLocation();
        }, {
            enableHighAccuracy: true, 
            timeout: 5000,
            maximumAge: 0});
    } else {
        //"Geolocation is not supported by this browser.";
    }
}

function getForecast(position){
    const req = new XMLHttpRequest();

    req.onreadystatechange = function(event) {
        // XMLHttpRequest.DONE === 4
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                const forecast = JSON.parse(this.responseText);
                displayForecast(forecast)
            } else {
                console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
            }
        }
    };

    req.open('GET', 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&units=metric&appid=' + APP_ID + '&lang=fr', true);
    req.send(null);
}

function getCityWeather(e) {
    const req = new XMLHttpRequest();
    var cityId = e.currentTarget.id;

    req.onreadystatechange = function(event) {
        // XMLHttpRequest.DONE === 4
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                const weather = JSON.parse(this.responseText);
                displayWeather(weather)
            } else {
                console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
            }
        }
    };

    req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?id=' + cityId + '&units=metric&appid=' + APP_ID + '&lang=fr', true);
    req.send(null);
    
    const req2 = new XMLHttpRequest();

    req2.onreadystatechange = function(event) {
        // XMLHttpRequest.DONE === 4
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                const forecast = JSON.parse(this.responseText);
                displayForecast(forecast)
            } else {
                console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
            }
        }
    };

    req2.open('GET', 'http://api.openweathermap.org/data/2.5/forecast/daily?id=' + cityId + '&units=metric&appid=' + APP_ID + '&lang=fr', true);
    req2.send(null);
}

getLocation();

document.getElementById("2643743").addEventListener("click", getCityWeather);
document.getElementById("2988507").addEventListener("click", getCityWeather);
document.getElementById("5128581").addEventListener("click", getCityWeather);
document.getElementById("3117735").addEventListener("click", getCityWeather);
document.getElementById("1850147").addEventListener("click", getCityWeather);
document.getElementById("524901").addEventListener("click", getCityWeather);




