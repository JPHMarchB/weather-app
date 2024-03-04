// Api key and URL
const apiKey = "f39a902740d225b3f3b587028bfddb99"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?lang=en&units=imperial&q="

// Search function
const searchBox = document.querySelector(".search-bar input")
const searchBtn = document.querySelector(".search-bar img")
const weatherStatus = document.querySelector(".weather-icon")

// Function that takes a city (from the search bar) and gets the data related to that city
async function weatherCheck(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    const data = await response.json()

    // Check if the info entered is a real city
    if (response.status === 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }

    // get temp data and put it into a predefined class
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp)
    // get city data and put it into a predefined class
    document.querySelector(".city").innerHTML = data.name
    // get country data and put it into a predefined class
    document.querySelector(".country").innerHTML = data.sys.country
    // get humidity data and put it into a predefined class
    document.querySelector(".humid").innerHTML = data.main.humidity
    // get wind data and put it into a predefined class
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed)

    // checking for sky status
    if (data.weather[0].main === "Clouds") {
        weatherStatus.src = "public/weather-status-images/clouds.png"
    } else if (data.weather[0].main === "Clear") {
        weatherStatus.src = "public/weather-status-images/clear.png"
    } else if (data.weather[0].main === "Rain") {
        weatherStatus.src = "public/weather-status-images/rain.png"
    } else if (data.weather[0].main === "Snow") {
        weatherStatus.src = "public/weather-status-images/snow.png"
    } else if (data.weather[0].main === "Mist") {
        weatherStatus.src = "public/weather-status-images/mist.png"
    } else if (data.weather[0].main === "Drizzle") {
        weatherStatus.src = "public/weather-status-images/drizzle.png"
    }

    // Display content when you search a city
    document.querySelector(".weather").style.display = "block"
    document.querySelector(".error").style.display= "none"
}

// Event that checks the value in the searchBox when you click the search icon
searchBtn.addEventListener("click", ()=>{

    // Call the weatherCheck function with the value from the search box
    weatherCheck(searchBox.value)
})

// Event that checks the value in the searchBox when you press enter
searchBox.addEventListener("keypress", function(event) {

    // Check if the pressed key is the "Enter" key
    if (event.key === "Enter") {

        // Call the weatherCheck function with the value from the search box
        weatherCheck(searchBox.value);
    }
})
