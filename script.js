const cities = [
    { name: "Praha", temperature: 15, description: "Slunečno" },
    { name: "Brno", temperature: 16, description: "Oblačno" },
    { name: "Ostrava", temperature: 14, description: "Déšť" },
    { name: "Plzen", temperature: 14, description: "Mlha" },
    { name: "Liberec", temperature: 13, description: "Zataženo" }
];

const citySelect = document.getElementById("city-select");
const weatherInfo = document.getElementById("weather-info");

function displayWeather(city) {
    const selectedCity = cities.find(item => item.name.toLowerCase() === city.toLowerCase());
    if (selectedCity) {
        weatherInfo.innerHTML = `<h2>Počasí v ${selectedCity.name}:</h2>
                                  <p>Teplota: ${selectedCity.temperature}°C</p>
                                  <p>Popis: ${selectedCity.description}</p>`;
    } else {
        weatherInfo.innerHTML = "<p>Požadované město nenalezeno.</p>";
    }
}

citySelect.addEventListener("change", function() {
    const selectedCity = this.value;
    displayWeather(selectedCity);
});

const cityForm = document.getElementById("cityForm");

cityForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const cityName = document.getElementById("cityName").value;
    const temperature = document.getElementById("temperature").value;
    const description = document.getElementById("description").value;

    const newCity = { name: cityName, temperature: temperature, description: description };
    cities.push(newCity);
    localStorage.setItem("cities", JSON.stringify(cities));

    updateCitySelect();

    cityForm.reset();
});

function updateCitySelect() {
    citySelect.innerHTML = "";
    cities.forEach(city => {
        citySelect.innerHTML += `<option value="${city.name.toLowerCase()}">${city.name}</option>`;
    });
}

const storedCities = localStorage.getItem("cities");
if (storedCities) {
    cities = JSON.parse(storedCities);
}

updateCitySelect();

displayWeather(citySelect.value.toLowerCase());

