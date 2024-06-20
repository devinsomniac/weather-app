const LatLonUrl =  'https://api.openweathermap.org/geo/1.0/direct?q='
const url = 'https://api.openweathermap.org/data/3.0/onecall?'
const key = '95e4765303293a48503828f719845bcb'
let lati
let long

const weatherDetailsContainer = $('#containerWeather')
const searchBarPlace = $('#searchBarId')
const searchBarButtonPlace = $('#searchBarButtonId')
const tempImagePlace = $('#tempImageId')
const tempPlace = $('#tempId')
const cityPlace = $('#cityId')
const humidityPlace = $('#humidityId')
const windSpeedPlace = $('#windSpeedId')
const descPlace = $('#descId')



//Using jQuery

const getWeatherTemp = (lat,lon) => {
    $.ajax({
        url : `${url}lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${key}`,
        method : 'GET',
        success : (apiData) => {
            console.log(apiData)
            const celcius = (apiData.current.temp-273.15).toFixed(2)
            console.log(celcius)
            tempPlace.html (`${celcius}°`)
            const tempIcon = apiData.current.weather[0].icon
            console.log(tempIcon)
            const TempImageurl = `https://openweathermap.org/img/wn/${tempIcon}@2x.png`;
            tempImagePlace.html(`<img src="${TempImageurl}">`)
            descPlace.html(`${apiData.current.weather[0].description} <br>`)
            const humidityValue = apiData.current.humidity
            humidityPlace.html(`${humidityValue}%`)
            const windSpeedValue = apiData.current.wind_speed
            windSpeedPlace.html(`${windSpeedValue} Km/h`)
        },
        error : (error) => {
            console.error("Error fetching location data:", error)
        }

    })
}

//Using Promise and await

// const getWeatherTemp = async(lat,lon) => {
//     const results = await fetch(`${url}lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${key}`)
//     const apiData = await results.json()
//     console.log(apiData)
//     const celcius = (apiData.current.temp-273.15).toFixed(2)
//     console.log(celcius)
//     tempPlace.html (`${celcius}°`)
//     const tempIcon = apiData.current.weather[0].icon
//     console.log(tempIcon)
//     const TempImageurl = `https://openweathermap.org/img/wn/${tempIcon}@2x.png`;
//     tempImagePlace.html(`<img src="${TempImageurl}">`)
//     descPlace.html(`${apiData.current.weather[0].description} <br>`)
//     const humidityValue = apiData.current.humidity
//     humidityPlace.html(`${humidityValue}%`)
//     const windSpeedValue = apiData.current.wind_speed
//     windSpeedPlace.html(`${windSpeedValue} Km/h`)
// }



const letandLong = (value) => {
    $.ajax({
        url : `${LatLonUrl}${value}&limit=0&appid=95e4765303293a48503828f719845bcb`,
        method: 'GET',
        success : (data) => {
            if(typeof data === 'string'){
                data = JSON.parse(data)
            }
            if(Array.isArray(data) && data.length > 0){
                for(let i = 0 ; i< data.length ; i++){
                    if(data[i].lat && data[i].lon){
                        lati = data[i].lat
                        long = data[i].lon
                        break;
                    }
                }
            }
            
            console.log(lati)
            console.log(long)
            cityPlace.html(value)
            getWeatherTemp(lati,long)
        },
        error : (error) => {
            console.error("Error fetching location data:", error);
        }

    })
}


// const letandLong = async(value) => {
//     const response = await fetch(`${LatLonUrl}${value}&limit=0&appid=95e4765303293a48503828f719845bcb`)
//     const data = await response.json()
//     if (Array.isArray(data) && data.length > 0) {
//         for (let i = 0; i < data.length; i++) {
//             if (data[i].lat && data[i].lon) {
//                 lati = data[i].lat;
//                 long = data[i].lon;
//                 break; // Exit loop once lat and lon are found
//             }
//         }
//     }
//     console.log(lati)
//     console.log(long)
//     cityPlace.text(value)
//     getWeatherTemp(lati,long)
// }

searchBarButtonPlace.click ( (event) => {
    event.preventDefault()
    const value = searchBarPlace.val()
    letandLong(value)
    weatherDetailsContainer.css("height", "500px")
})
