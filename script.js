const apiKey = "a0a03e1d97msh074217fc318438ep1fe03ejsn44efee5dfa35";
const apiHost = "open-weather13.p.rapidapi.com";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const tempEl = document.getElementById("temp");
const cityEl = document.getElementById("city");
const feelsLikeEl = document.getElementById("feelsLike");
const windSpeedEl = document.getElementById("windSpeed");

const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");

function fToC(f) {
  return ((f - 32) * 5 / 9).toFixed(1);
}

function mpsToKmph(m) {
  return (m * 3.6).toFixed(1);
}

async function getWeather(city) {
  const url = `https://${apiHost}/city/${city}/IN`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost
    }
  };

  // Show loading
  loadingEl.style.display = "block";
  errorEl.style.display = "none";

  try {
    const res = await fetch(url, options);

    if (!res.ok) throw new Error("City not found");

    const data = await res.json();

    cityEl.textContent = data.name;
    tempEl.textContent = `${fToC(data.main.temp)}°C`;
    feelsLikeEl.textContent = `${fToC(data.main.feels_like)}°C`;
    windSpeedEl.textContent = `${mpsToKmph(data.wind.speed)} km/h`;

    loadingEl.style.display = "none";
  } catch (error) {
    loadingEl.style.display = "none";
    errorEl.style.display = "block";

    cityEl.textContent = "City";
    tempEl.textContent = "--°";
    feelsLikeEl.textContent = "--°";
    windSpeedEl.textContent = "-- km/h";

    console.error("Error:", error.message);
  }
}

function handleSearch() {
  const city = cityInput.value.trim();
  if (city !== "") {
    getWeather(city);
  }
}

searchBtn.addEventListener("click", handleSearch);

// Allow Enter key
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});
