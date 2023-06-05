var dayOfWeek = dayjs().day();
var searchButton = document.getElementById('searchButton');
var history = [];
var responseObj;
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var now = new Date();
var day = days[ now.getDay() ];

function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();    
    return isNaN(dayOfWeek) ? null : 
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
  }

console.log(day);

function getAPI() {
    var requestURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchInput.value + '&limit=5&appid=59b1fac7db283fe209a8d74c1390402d';

    console.log(requestURL);

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
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
    document.getElementById("city").innerHTML = searchInput;
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
    var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=59b1fac7db283fe209a8d74c1390402d';

    console.log(requestURL);

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const fiveDay = data.list.filter((timeBlock, index) => index % 8 === 0);
            show5Day(fiveDay);
        })
}

function show5Day(weatherArr) {
    $("#todaysWeather").empty();
    const todaysWeather = $(`
        <h4>Temperature: ${weatherArr[0].main.temp} | Wind: ${weatherArr[0].wind.speed} | Humidity: ${weatherArr[0].main.humidity}</h4>
        `)
    $("#todaysWeather").append(todaysWeather);

    $("#5DayForecast").empty();

    for (let i = 0; i < weatherArr.length; i++) {
        const currentDay = weatherArr[i];
        console.log(currentDay);
        const card = $(`
    <div class="col-2 bg-light py-2 day">
    <img src="http://openweathermap.org/img/w/${currentDay.weather[0].icon}.png">
        <h5>${getDayOfWeek(currentDay.dt_txt)}</h5>
        <p>${currentDay.weather[0].main}</p>
        <p>T: ${currentDay.main.temp}</p>
        <p>W: ${currentDay.wind.speed}</p>
        <p>H: ${currentDay.main.humidity}</p>
    </div>
    `)

        $("#5DayForecast").append(card);
    }

}