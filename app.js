window.addEventListener("load", () => {
  let long;
  let lat;
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let icon = document.querySelector(".icon");
  let temperature = document.querySelector(".temperature");
  let temperatureUnit = document.querySelector(".temperature-unit");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.weatherapi.com/v1/current.json?key=d23e263e27aa4ca59a8142614230506&q=${lat},${long}&aqi=no`;

      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          locationTimezone.textContent = data.location.tz_id;
          temperatureDegree.textContent = data.current.feelslike_f;
          temperatureDescription.textContent = data.current.condition.text;
          icon.src = data.current.condition.icon;
          icon.alt = "Icon of weather condition";

          temperature.addEventListener("click", () => {
            if (temperatureUnit.textContent === "F") {
              temperatureUnit.textContent = "C";
              temperatureDegree.textContent = data.current.feelslike_c;
            } else {
              temperatureUnit.textContent = "F";
              temperatureDegree.textContent = data.current.feelslike_f;
            }
          });
        });
    });
  }
});
