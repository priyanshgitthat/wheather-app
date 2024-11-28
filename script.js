let main = document.querySelector('body main');
let inp = document.querySelector('#inp');
let btn = document.querySelector('#btn');
let weatherResult = document.querySelector('#weatherResult');
let span = document.querySelectorAll('.row > span')
let h2 = document.querySelectorAll('.row h2')
console.log(h2);





const API_KEY = 'e20a504c3c404250a0e174200242711'; // Replace with your WeatherAPI key
const BASE_URL = 'https://api.weatherapi.com/v1/current.json'; // Endpoint for current weather

// Fetch weather data function
async function getWeather(city) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${city}&aqi=no`; // AQI disabled for simplicity

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('API Response:', data); // Debugging

        if (response.ok) {
            displayWeather(data);
        } else {
            weatherResult.innerHTML = `<h4>Error: ${data.error.message}</h4>`;
        }
    } catch (error) {
        console.log('Error fetching weather data:', error);
        weatherResult.innerHTML = `<h4>Failed to fetch weather data. Please try again.</h4> <h3>please try to refresh the page</h3>`;
    }
}

// Display weather data
function displayWeather(data) {
    console.log('data -> ',data);
    console.log('data.location -> ',data.location);
    console.log('data.current -> ',data.current);
    console.log('val->', data.current.temp_c);
    let child = Array.from(weatherResult.children)

    child[0].textContent = `${data.location.name}`
    child[1].innerHTML=`${data.current.temp_c} <sup>o</sup> C`
    child[3].textContent=`${data.location.country}`
    span[0].textContent=`${data.current.humidity}`
    h2[0].textContent='humidity'
    h2[1].textContent='windspeed'
    h2[2].textContent='condition'
    h2[3].textContent='time'
    span[2].textContent=`${data.current.condition.text}`
    span[1].textContent=`${data.current.wind_kph} kph`
    span[3].textContent=`${data.location.localtime}`
    
    
    
    
    // const { location, current } = data;
    // weatherResult.innerHTML = `
    //     <h4>${data.location.name}</h4>
    //     <h1>${data.current.temp_c} °C</h1>
    //     <h3>${val}</h3>
    // `;
}

// Event listener for button click
btn.addEventListener('click', () => {
    const city = inp.value.trim();
    if (city) {
        weatherResult.style.visibility="visible"
        getWeather(city);
    } else {
        weatherResult.innerHTML = '<h4>Please enter a city name.</h4>';
    }
});
