//JS Begin
let img = document.querySelector("#weatherIcon");
let temp = document.querySelector("#temperature");
let inputCity = document.querySelector("#city");
let city = document.querySelector("#cityName");
let description = document.querySelector("#description");
let humid = document.querySelector("#Humid");
let wind = document.querySelector("#Wind");
let search = document.querySelector("#searchBtn");

let url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apikey = "869057fcb6c686d77e74f02c1f8d2c8d";

search.addEventListener("click", fetchWeatherData);


window.addEventListener("load", () => {
    inputCity.value = "Chandigarh";
    fetchWeatherData();
})



function fetchWeatherData() {

    cityName = inputCity.value;
    let fullURL = url + cityName + "&appid=" + apikey;

    document.querySelector("#loader").style.display = "block";
    fetch(fullURL)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            city.innerHTML = data.name;
            temp.innerHTML = Math.round(data.main.temp) + "°C";
            humid.innerHTML = data.main.humidity + "%";
            wind.innerHTML = data.wind.speed + "Km/h";
            description.innerHTML = data.weather[0].description;
            document.querySelector("#loader").style.display = "none";
        })
        .catch(error => {
            alert("Entered city not found.");
            document.querySelector("#loader").style.display = "none";
        })
}
let tl = gsap.timeline();

gsap.to("#weatherIcon", {
  y: -30,
  duration: 3,
  ease: "power1.inOut",
  repeat: -1,
  yoyo: true,
});

tl.from("#temperature, #cityName", {
  x: 50,
  duration: 0.5,
  opacity: 0,
  stagger: 0.2,
  ease: "power2.out"

});

tl.from("#description", {
  y: 30,
  duration: 0.3,
  opacity: 0
});

tl.from("#Humid, #Wind", {
  y: 40,
  duration: 0.3,
  opacity: 0,
  stagger: 0.2
});

tl.from("#Humid_img, #Wind_img", {
  y: 40,
  duration: 0.2,
  opacity: 0,
  stagger: 0.2
});

//Completed
