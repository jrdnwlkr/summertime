var dayOfWeek = dayjs().day();
var searchButton = document.getElementById('searchButton');
console.log(searchButton);


function getAPI() {
    var requestURL = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=59b1fac7db283fe209a8d74c1390402d';

    fetch(requestURL)
    .then(function(response) {
        return response.json();
    })
     .then(function(data) {
        console.log(data);
    })
}
console.log("hello")
getAPI()

//Add city to local storage and search history

function getHistory() {
    return localStorage.getItem("city")
}

searchButton.addEventListener("click", myFunction);

function myFunction() {
    var searchInput = document.getElementById('searchInput').value;
    console.log(searchInput);
    localStorage.setItem("City", searchInput)
}



