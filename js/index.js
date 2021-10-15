const param = {
	"url" : "https://api.openweathermap.org/data/2.5/",
	"appid" : "77a7773ef2886e679917a6f6ef84692f",
  "lang" : "ru"
}

console.log();

const cities =  {
  5128638 : "New York",
  480562 : "Tula",
  2151682 : "Rhodes",
  324190 : "Alanya",
  1151254 : "Phuket",

}

function getSelect() {
  let out = document.querySelector(".out")
  let select = document.createElement("select");
  
  select.id = "selectNew";
  select.classList.add("cites");
  out.after(select);
}

function getOptions() {
  let select = document.getElementById("selectNew");
  let citesArray = Object.entries(cities);
  
  for(i = 0; i < citesArray.length; i++) {
    let opt = document.createElement('option');
    opt.value = citesArray[i][0];
    opt.innerHTML = citesArray[i][1];
    select.appendChild(opt);
  }
}

getSelect();
getOptions();

function getWeather() {
  const cityId = document.querySelector('.cites').value;
  fetch(`${param.url}weather?id=${cityId}&lang=${param.lang}&units=metric&APPID=${param.appid}`)
	.then(weather => {
			return weather.json();
		}).then(showWeather);
}

function showWeather(data) {
	console.log(data);
  cityName = document.querySelector(".card-wethear__city").textContent = data.name;
  temputer = document.querySelector(".card-wethear__temp").innerHTML = Math.round(data.main.temp) + "&#8451;";
  humidity = document.querySelector(".card-wethear__humidity").innerHTML = data.main.humidity + "&#37;";
  cloud = document.querySelector(".card-wethear__cloudy").textContent = data.weather[0].description;
  image = document.getElementById("img");
  image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  image.alt = "Изображение погоды";

}


getWeather();

document.querySelector('.cites').onchange = getWeather;