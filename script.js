var dayOfWeek = dayjs().day();
var searchButton = document.getElementById('searchButton');
var history = [];
var responseObj;


function getAPI() {
    var requestURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchInput.value + '&limit=5&appid=59b1fac7db283fe209a8d74c1390402d';

    console.log(requestURL);

    fetch(requestURL)
    .then(function(response) {
        return response.json();
    })
     .then(function(data) {
        console.log(data);
        
        getLatLon(data);
    })
}

//Search for a City
searchButton.addEventListener("click", myFunction);

function myFunction() {
    var searchInput = document.getElementById('searchInput').value;
    localStorage.setItem("City", searchInput)
    // history.push(searchInput);
    // console.log(history);
    console.log(searchInput);
    getAPI();
}

function getLatLon(data) {
    var responseObj = data;
    console.log(responseObj);
    var lat = responseObj[0].lat;
    var lon = responseObj[0].lon;
    console.log(lat, lon);
    getWeather(lat, lon)
}

function getWeather(lat, lon) {
    var requestURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=59b1fac7db283fe209a8d74c1390402d';

    console.log(requestURL);

    fetch(requestURL)
    .then(function(response) {
        return response.json();
    })
     .then(function(data) {
        console.log(data);
    })
}

// loop through data responsee from getWeather 0-4
// display those 5 days