const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = 'ccd49a672e5b303c1963d5d4d53b3c69';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if (json.cod === '404') {
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active'); // Show the 404 error message
            return;
        }

        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            

            // Preload the image to avoid layout shifts
            let weatherImage = new Image();
            weatherImage.onload = () => {
                image.src = weatherImage.src;

                // Update the weather details after the image is loaded
                temperature.textContent = `${json.main.temp}°C`;
                description.textContent = json.weather[0].description;
                humidity.textContent = `${json.main.humidity}%`;
                wind.textContent = `${json.wind.speed} km/h`;

                weatherBox.style.display = 'block';
                weatherDetails.style.display = 'flex'; // Use flex to ensure proper layout
            };

            switch (json.weather[0].main) {
                case 'Clear':
                    weatherImage.src = 'Clear1.png';
                    break;

                case 'Rain':
                    weatherImage.src = 'Rainy1.png';
                    break;

                case 'Snow':
                    weatherImage.src = 'Snowy1.png';
                    break;

                case 'Mist':
                    weatherImage.src = 'Mist1.png';
                    break;

                case 'Clouds':
                    weatherImage.src = 'Cloud1.png';
                    break;

                case 'Haze':
                    weatherImage.src = 'Mist1.png';
                    break;

                default:
                    weatherImage.src = 'Cloud1.png';
                    break;
            }
            temperature.innerHTML=`${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML=`${json.weather[0].description}`;
            humidity.innerHTML=`${json.main.humidity}%`;
            wind.innerHTML=`${parseInt(json.wind.speed)}Km/h`;

            const infoWeather = document.querySelector('.info-weather');
            const infoHumidity = document.querySelector('.info-humidity');
            const infoWind = document.querySelector('.info-wind');

            const elCloneInfoWeather = infoWeather.cloneNode(true);
            const elCloneInfoHumidity = infoHumidity.cloneNode(true);
            const elCloneInfoWind = infoWind.cloneNode(true);

            elCloneInfoWeather.id = 'clone-info-weather';
            elCloneInfoWeather.classList.add('active-clone');

            elCloneInfoHumidity.id = 'clone-info-humidity';
            elCloneInfoHumidity.classList.add('active-clone');

            elCloneInfoWind.id = 'clone-info-wind';
            elCloneInfoWind.classList.add('active-clone');

            setTimeout(()=>{
                infoWeather.insertAdjacentElement("afterend",elCloneInfoWeather);
                infoHumidity.insertAdjacentElement("afterend",elCloneInfoHumidity);
                infoWind.insertAdjacentElement("afterend",elCloneInfoWind);
            },2200);

            const CloneInfoWeather=document.querySelectorAll('.info-weather.active-clone');
            const totalCloneInfoWeather=CloneInfoWeather.length;
            const CloneInfoWeatherFirst=CloneInfoWeather[0];

            const CloneInfoHumidity=document.querySelectorAll('.info-humidity.active-clone');
            const CloneInfoHumidityFirst=CloneInfoHumidity[0];

            const CloneInfoWind=document.querySelectorAll('.info-wind.active-clone');
            const CloneInfoWindFirst=CloneInfoWind[0];

            if(totalCloneInfoWeather>0){
                CloneInfoWeatherFirst.classList.remove('active-clone');
                CloneInfoHumidityFirst.classList.remove('active-clone');
                CloneInfoWindFirst.classList.remove('active-clone');

                setTimeout(()=>{
                    CloneInfoWeatherFirst.remove();
                    CloneInfoHumidityFirst.remove();
                    CloneInfoWindFirst.remove();
                },2200);
            }

        });
});