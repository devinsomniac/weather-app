const getWeatherTemp = (lat, lon) => {
    $.ajax({
        url: `${url}lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${key}`,
        method: 'GET',
        success: (apiData) => {
            // If the response is not JSON, parse it manually
            if (typeof apiData === 'string') {
                apiData = JSON.parse(apiData);
            }
            console.log(apiData);
            const celsius = (apiData.current.temp - 273.15).toFixed(2);
            console.log(celsius);
            tempPlace.html(`${celsius}°`);
            const tempIcon = apiData.current.weather[0].icon;
            console.log(tempIcon);
            const TempImageurl = `https://openweathermap.org/img/wn/${tempIcon}@2x.png`;
            tempImagePlace.html(`<img src="${TempImageurl}">`);
            descPlace.html(`${apiData.current.weather[0].description} <br>`);
            const humidityValue = apiData.current.humidity;
            humidityPlace.html(`${humidityValue}%`);
            const windSpeedValue = apiData.current.wind_speed;
            windSpeedPlace.html(`${windSpeedValue} Km/h`);
        },
        error: (error) => {
            console.error("Error fetching weather data:", error);
        }
    });
};