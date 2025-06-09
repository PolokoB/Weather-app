const apiKey = "2c41739b1378428f93827ca9d494820e";

function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "Please enter a city name.";
    return;
  }

  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`;

  fetch(geoUrl)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(geoData => {
      if (!geoData.length) throw new Error("City not found");
      const { lat, lon, name, country } = geoData[0];

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      return fetch(weatherUrl)
        .then(response => {
          if (!response.ok) throw new Error("Weather data not found");
          return response.json();
        })
        .then(weatherData => {
          const weather = `
            <h2>${name}, ${country}</h2>
            <p><strong>Temperature:</strong> ${weatherData.main.temp}°C</p>
            <p><strong>Weather:</strong> ${weatherData.weather[0].description}</p>
            <p><strong>Humidity:</strong> ${weatherData.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${weatherData.wind.speed} m/s</p>
          `;
          resultDiv.innerHTML = weather;
        });
    })
    .catch(error => {
      resultDiv.innerHTML = "Error: " + error.message;
    });
}
