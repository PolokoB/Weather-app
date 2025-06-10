function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "Please enter a city name.";
    return;
  }

  const weatherUrl = `https://us-central1-etl-project-462412.cloudfunctions.net/get_weather?city=${encodeURIComponent(city)}`;

  fetch(weatherUrl)
    .then(response => {
      if (!response.ok) throw new Error("Weather data not found");
      return response.json();
    })
    .then(data => {
      const weather = `
        <h2>${data.location}</h2>
        <p><strong>Temperature:</strong> ${data.temperature}°C</p>
        <p><strong>Weather:</strong> ${data.description}</p>
        <p><strong>Humidity:</strong> ${data.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind_speed} m/s</p>
      `;
      resultDiv.innerHTML = weather;
    })
    .catch(error => {
      resultDiv.innerHTML = "Error: " + error.message;
    });
}
