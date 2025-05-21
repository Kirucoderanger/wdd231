
// Weather API script
// This script fetches weather data from the OpenWeatherMap API and displays it on the webpage.
// It retrieves the current weather and a 5-day forecast for a specified location.
// This script also includes a search feature to allow users to find weather data for different cities.
// It uses the Geolocation API to get the user's current location and fetches weather data accordingly.
// It also includes a search feature to allow users to find weather data for different cities.


const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");
const locationn = document.querySelector("#location");
const weatherDescription = document.querySelector("#weather-description");
const weatherForecast = document.querySelector("#weather-forecast");
const weatherForecastList = document.querySelector("#weatherForecastList");


const myApiKey = "a87f968813647290ca0c9952cbca4cef";
const latitude = 49.747159953465044;
const longitude = 6.641893230214196;
const units = "imperial"; // Use "metric" for Celsius
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${myApiKey}&units=${units}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${myApiKey}&units=${units}`;
let iconSize = "@2x.png"; // Size of the weather icon
const weatherIconAlt = "Weather icon";
const weatherIconURL = "https://openweathermap.org/img/wn/";
const weatherIconDesc = "Weather description";
const weatherData = {
  current: null,
  forecast: null,
};
async function apiFetch() {
  try {
    const response = await fetch(weatherURL);
    
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        displayWeather(data);
    } else {
         throw Error(await response.text());
     }
    } catch (error) {
        console.log(error);
    }
}

function displayWeather(data, dataCelsius) {
    console.log("Displaying weather data...");
    locationn.innerHTML = `<strong>${data.name}</strong>`;
    weatherDescription.innerHTML = `<strong>${data.weather[0].description}</strong>`;
    currentTemp.innerHTML = `<strong>${Math.round(data.main.temp)}&deg;F/${Math.round(dataCelsius.main.temp)}&deg;C</strong>`;
    const iconURL = `${weatherIconURL}${data.weather[0].icon}${iconSize}`;
    weatherIcon.setAttribute("src", iconURL);
    weatherIcon.setAttribute("alt", weatherIconAlt);
    captionDesc.textContent = `${data.weather[0].description}`;
    displayForecast();
}


 
async function displayForecast() {
    try {
        const response = await fetch(forecastURL);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
           
            weatherForecastList.innerHTML = ""; // Clear previous content
            data.list.forEach((item) => {
                const date = new Date(item.dt * 1000);
                const temperature = Math.round(item.main.temp);
                const iconCode = item.weather[0].icon;
                const iconURL = `${weatherIconURL}${iconCode}${iconSize}`;
                const description = item.weather[0].description;

                const forecastItem = document.createElement("div");
                
                
                forecastItem.classList.add("forecast-item");
                forecastItem.innerHTML = `
                    <p>${date.toLocaleDateString()}</p>
                    <img src="${iconURL}" alt="${description}">
                    <p>${temperature}°F</p>
                `;
                weatherForecastList.appendChild(forecastItem);
            });
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}


apiFetch();

/* --- Geolocation and Search Weather Feature --- */

// Create search UI elements
const searchContainer = document.createElement("div");
searchContainer.id = "weather-search-container";
searchContainer.style.margin = "1em 0";

const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Search for a city...";
searchInput.id = "weather-search-input";
searchInput.autocomplete = "off";
searchInput.style.marginRight = "0.5em";

const searchButton = document.createElement("button");
searchButton.textContent = "Search";
searchButton.id = "weather-search-btn";

const suggestionsList = document.createElement("ul");
suggestionsList.id = "weather-search-suggestions";
suggestionsList.style.listStyle = "none";
suggestionsList.style.padding = "0";
suggestionsList.style.margin = "0.5em 0";
suggestionsList.style.background = "#fff";
suggestionsList.style.position = "absolute";
suggestionsList.style.zIndex = "1000";
suggestionsList.style.width = "200px";
suggestionsList.style.border = "1px solid #ccc";
suggestionsList.style.display = "none";

// Insert search UI into DOM
searchContainer.appendChild(searchInput);
searchContainer.appendChild(searchButton);
searchContainer.appendChild(suggestionsList);
document.body.insertBefore(searchContainer, document.body.firstChild);

// Helper: fetch weather for given lat/lon
async function fetchWeatherByCoords(lat, lon) {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myApiKey}&units=${units}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${myApiKey}&units=${units}`;
    const weatherCelsius = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myApiKey}&units=metric`;
    const forecastCelsius = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${myApiKey}&units=metric`;
    
    try {
        const [weatherRes, forecastRes, weatherCelsiusRes, forecastCelsiusRes ] = await Promise.all([
            fetch(weatherURL),
            fetch(forecastURL),
            fetch(weatherCelsius),
            fetch(forecastCelsius)
        ]);
        if (weatherRes.ok && forecastRes.ok && weatherCelsiusRes.ok && forecastCelsiusRes.ok) {
            const weatherData = await weatherRes.json();
            const forecastData = await forecastRes.json();
            const weatherCelsiusData = await weatherCelsiusRes.json();
            const forecastCelsiusData = await forecastCelsiusRes.json();
            displayWeather(weatherData, weatherCelsiusData);
            displayForecastData(forecastData, forecastCelsiusData);
        }
    } catch (err) {
        console.log("Error fetching weather:", err);
    }
}

// Helper: display forecast for search
function displayForecastData(data, dataCelsius) {
    weatherForecastList.innerHTML = "";

    data.list.forEach((item) => {
        // Filter to show only 3-hour intervals
        if (item.dt_txt.split(" ")[1] !== "12:00:00") return;

        const date = new Date(item.dt * 1000);
        const temperature = Math.round(item.main.temp);
        const iconCode = item.weather[0].icon;
        const iconURL = `${weatherIconURL}${iconCode}${iconSize}`;
        const description = item.weather[0].description;

        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");
        forecastItem.innerHTML = `
            <p>${date.toLocaleDateString()}</p>
            <img src="${iconURL}" alt="${description}">
            <p>${temperature}°F</p>
        `;
        weatherForecastList.appendChild(forecastItem);
    });
}

// Geolocation: try to get user location and fetch weather
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
            // If denied, fallback to default
            apiFetch();
        }
    );
} else {
    apiFetch();
}

// City search: fetch city suggestions from OpenWeatherMap Geocoding API
async function fetchCitySuggestions(query) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${myApiKey}`;
    const res = await fetch(url);
    if (res.ok) {
        return await res.json();
    }
    return [];
}

// Handle search input
searchInput.addEventListener("input", async (e) => {
    const query = e.target.value.trim();
    suggestionsList.innerHTML = "";
    if (query.length < 2) {
        suggestionsList.style.display = "none";
        return;
    }
    const suggestions = await fetchCitySuggestions(query);
    if (suggestions.length > 0) {
        suggestionsList.style.display = "block";
        suggestions.forEach((city) => {
            const li = document.createElement("li");
            li.textContent = `${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`;
            li.style.cursor = "pointer";
            li.style.padding = "0.25em";
            li.addEventListener("click", () => {
                searchInput.value = li.textContent;
                suggestionsList.style.display = "none";
                fetchWeatherByCoords(city.lat, city.lon);
            });
            suggestionsList.appendChild(li);
        });
    } else {
        suggestionsList.style.display = "none";
    }
});

// Hide suggestions on blur
searchInput.addEventListener("blur", () => {
    setTimeout(() => { suggestionsList.style.display = "none"; }, 200);
});

// Search button click
searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (!query) return;
    const suggestions = await fetchCitySuggestions(query);
    if (suggestions.length > 0) {
        fetchWeatherByCoords(suggestions[0].lat, suggestions[0].lon);
    }
});
// Call the function to fetch and display weather data












/*const currentTemperature = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("#figcaption");


//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//Trier, Germany lat = 49.747159953465044, long = 6.641893230214196
//APIkey = a87f968813647290ca0c9952cbca4cef
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=49.747159953465044&lon=6.641893230214196&appid=a87f968813647290ca0c9952cbca4cef&units=imperial";
const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=49.747159953465044&lon=6.641893230214196&appid=a87f968813647290ca0c9952cbca4cef&units=imperial";

//const weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=43.0704&lon=-112.4437&appid=a0f2c3b1d4e5f7a8b6c9d4e5f7a8b6c9&units=imperial";   
//const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=43.0704&lon=-112.4437&appid=a0f2c3b1d4e5f7a8b6c9d4e5f7a8b6c9&units=imperial";
const apiKey = "a87f968813647290ca0c9952cbca4cef";
const city = "Rexburg";
const units = "imperial";
const weatherData = {
  current: null,
  forecast: null,
};
const weatherIconURL = "https://openweathermap.org/img/wn/";
const weatherIconSize = "@2x.png";
const weatherIconAlt = "Weather icon";
const weatherIconDesc = "Weather description";

async function apiFetch()
{
  try {
    const response = await fetch(weatherURL);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        //console.log(data.main.temp);
        //console.log(data.weather[0].icon);
        //console.log(data.weather[0].description);
        return data;

      //return await response.json();
    } else {
       throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}
async function getWeatherData() {
  try {
    const currentWeather = await apiFetch(weatherURL);
    const forecastWeather = await apiFetch(forecastURL);
    weatherData.current = currentWeather;
    weatherData.forecast = forecastWeather;
  } catch (error) {
    console.error("Error fetching weather data: ", error);
  }
}
async function displayWeather() {
  try {
    await getWeatherData();
    const current = weatherData.current;
    const forecast = weatherData.forecast;

    if (current && forecast) {
      const temperature = Math.round(current.main.temp);
      const iconCode = current.weather[0].icon;
      const iconURL = `${weatherIconURL}${iconCode}${weatherIconSize}`;
      const description = current.weather[0].description;

      currentTemperature.innerHTML = `<strong>${temperature}</strong>`;
      weatherIcon.setAttribute("src", iconURL);
      weatherIcon.setAttribute("alt", weatherIconAlt);
      captionDesc.textContent = weatherIconDesc;
    }
  } catch (error) {
    console.error("Error displaying weather data: ", error);
  }
}
async function displayForecast() {
  try {
    await getWeatherData();
    const forecast = weatherData.forecast;

    if (forecast) {
      const forecastList = forecast.list;
      const forecastContainer = document.querySelector("#forecast");
      forecastContainer.innerHTML = ""; // Clear previous content

      forecastList.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const temperature = Math.round(item.main.temp);
        const iconCode = item.weather[0].icon;
        const iconURL = `${weatherIconURL}${iconCode}${weatherIconSize}`;
        const description = item.weather[0].description;

        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");
        forecastItem.innerHTML = `
          <p>${date.toLocaleDateString()}</p>
          <img src="${iconURL}" alt="${description}">
          <p>${temperature}°F</p>
        `;
        forecastContainer.appendChild(forecastItem);
      });
    }
  } catch (error) {
    console.error("Error displaying forecast data: ", error);
  }
}
// Call the functions to display weather and forecast data
displayWeather();*/