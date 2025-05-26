const apiKey = "b0c7e2a657bb3eef66462c082e9ebb7e";
const searchBtn = document.getElementById("search-btn");
const cityinput = document.getElementById("city-input");
const resultDiv = document.getElementById("weather-result");

searchBtn.addEventListener("click", () => {
    const city = cityinput.value;
    if (city == "") {
        alert("Please enter a city name");
        return false;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod == "404") {
                alert("City not found");
                return false;
            }

            document.getElementById("city-name").innerText = `${data.name}, ${data.sys.country}`;
            document.getElementById("temperature").innerText = `🌡️ ${data.main.temp}°C`;
            document.getElementById("description").innerText = `☁️ ${data.weather[0].description}`;
            document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            resultDiv.classList.remove("hidden");
            updateBackground(data.weather[0].main);

        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("An error occurred while fetching weather data.");
        });
});

function updateBackground(weather) {
    const body = document.body;

    switch (weather.toLowerCase()) {
        case "clear":
            body.style.background = 'linear-gradient(to top, #a1c4fd, #c2e9fb)';
            break;
        case "clouds":
            body.style.background = 'linear-gradient(to top, #d7d2cc, #304352)';
            break;
        case "rain":
        case "drizzle":
            body.style.background = 'linear-gradient(to top, #bdc3c7, #2c3e50)';
            break;
        case "snow":
            body.style.background = 'linear-gradient(to top, #e6dada, #274046)';
            break;
        case "thunderstorm":
            body.style.background = 'linear-gradient(to top, #232526, #414345)';
            break;
        case "mist":
        case "fog":
            body.style.background = 'linear-gradient(to top, #757f9a, #d7dde8)';
            break;
        default:
            body.style.background = '#dff6ff';
    }
}

const weatherIcons = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Snow: "❄️",
    Thunderstorm: "⛈️",
    Mist: "🌫️",
    Fog: "🌁",
    Haze: "🌫️"
};
iconElem.textContent = weatherIcons[weather.main] || "🌍";
