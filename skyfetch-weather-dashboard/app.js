const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherDiv = document.getElementById("weather");

// 🔹 Fetch Weather Function (Async/Await)
async function getWeather(city) {
  const apiKey = "20c8844b8602170d479d75794e374d55"; // 🔴 Replace with your actual API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    showLoading();
    searchBtn.disabled = true;

    const response = await axios.get(url);
    const data = response.data;

    weatherDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>🌡 Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>🤔 Feels Like:</strong> ${data.main.feels_like}°C</p>
      <p><strong>🌤 Weather:</strong> ${data.weather[0].description}</p>
      <p><strong>💧 Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>🌬 Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;

  } catch (error) {
    if (error.response && error.response.status === 404) {
      showError("City not found. Please enter a valid city name.");
    } else {
      showError("Something went wrong. Please try again later.");
    }
  } finally {
    searchBtn.disabled = false;
  }
}

// 🔹 Show Loading Spinner
function showLoading() {
  weatherDiv.innerHTML = `
    <div class="spinner"></div>
    <p>Loading weather data...</p>
  `;
}

// 🔹 Show Error Message
function showError(message) {
  weatherDiv.innerHTML = `
    <p class="error">${message}</p>
  `;
}

// 🔹 Search Button Click Event
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city === "") {
    showError("Please enter a city name.");
    cityInput.focus();
    return;
  }

  getWeather(city);
  cityInput.value = "";
});

// 🔹 Enter Key Support
cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

// 🔹 Initial Welcome Message
weatherDiv.innerHTML = `
  <h3>🌍 Welcome to SkyFetch</h3>
  <p>Enter a city name above to check the weather.</p>
`;