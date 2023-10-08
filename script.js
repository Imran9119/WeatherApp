const apikey = "3dd637fed69c80f33f4827a678e9fba7";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weathericon");
const card = document.querySelector(".card"); // The card element to set the background image

async function checkweather(city) {
  const response = await fetch(`${apiurl}&q=${city}&appid=${apikey}`);
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "cloudy.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "sunny.png";
    } else if (data.weather[0].main == "Haze") {
      weatherIcon.src = "fog.png";
    }
    if (data.weather[0].main == "Rain") {
      weatherIcon.src = "rainy.png";
    }

    // Fetch the city image using the Unsplash API with the specific city name
    const cityImage = await getCityImageUrl(city);
    // Set the city image as the background of the card
    card.style.backgroundImage = `url('${cityImage}')`; // Make sure to use single quotes around the URL

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

// Function to get a background image URL based on the specific city name using Unsplash API
async function getCityImageUrl(cityName) {
  const unsplashAccessKey = "Pg-VQ8MzzMKUXLYMSLpRY1xQganc_oqBleuthVQ1aCo";
  const query = cityName + " city"; // Include the specific city name in the query

  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${query}&client_id=${unsplashAccessKey}`
  );
  const data = await response.json();

  if (data && data.urls && data.urls.regular) {
    return data.urls.regular;
  } else {
    // Return a default image URL or handle the error
    return "DEFAULT_IMAGE_URL";
  }
}

searchbtn.addEventListener("click", () => {
  checkweather(searchbox.value);
});
