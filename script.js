const URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const input = document.querySelector("#cityInput");
const btn = document.querySelector(".ico");
let Image = document.querySelector("#photo");

//Function to return the json file from the API
const update = async()=>{
    let weatherData = `${URL}${input.value}&appid=6c77fa799db9a4f8d954bdbe510d3873`;
    const response = await fetch(weatherData); // Used for fetching the data from the API
    if(!response.ok)
    alert("Please enter a valid city name");
    else{
        let data = await response.json();
        showWeather(data);
    }
}

//Adding Event of click on button
btn.addEventListener("click", update);

//Changing in the HTML USING JAVASCRIPT
const showWeather = (data)=>{
    let source = data.weather[0].main;
    //Changing the source of the weather according to the weather
    if(source==="Clouds"){
        Image.src = "clouds.png";
    }
    else if(source==="Snow"){
        Image.src = "snow.png";
    }
    else if(source==="Mist"){
        Image.src = "mist.png";
    }
    else if(source==="Drizzle"){
        Image.src = "drizzle.png";
    }
    else if(source==="Rain"){
        Image.src = "rain.png";
    }
    else{
        Image.src = "clear.png";
    }
    let temperature = data.main.temp;
    const humidity = data.main.humidity.toFixed()+"%";
    temperature = parseInt(temperature-273.15);
    const speed = parseInt((data.wind.speed*3.6))+"%";
    document.getElementById("city").innerHTML = data.name;
    document.getElementById("temp").innerHTML = temperature+"°C";
    document.getElementById("humidity").innerHTML = humidity;
    document.getElementById("spd").innerHTML = speed;
}

//Update the page according to the default value in the given HTML
window.onload = ()=> {
    update();
};

//Added the event listener for keyboard when Enter key is pressed
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        update();
    }
});