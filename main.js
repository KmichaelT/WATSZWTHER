class Weather{

  constructor(city, state){
      this.apiKey='6d248ecc0a71a7252ebc2cf2d41d8cc3';
      this.city=city;
      this.state=state;
  }
  async getWeather() {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state},&appid=${this.apiKey}`);

      const responseData=await response.json();
      return  responseData;
  }

 
}
document.getElementById('w-get').addEventListener('click', (e) => {
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;

  localStorage.setItem('city', city);
  localStorage.setItem('state', state);
});

if(localStorage.getItem('city') === null) {
  newcity = 'Dallas';
} else {
  newcity = localStorage.getItem('city');
}

if(localStorage.getItem('state') === null) {
  newstate = 'Tx';
} else {
  newstate = localStorage.getItem('state');
}

const weather = new Weather(newcity, newstate);

let cityname=document.getElementById("w-location");
let temp=document.getElementById('w-temp');
let icon=document.getElementById('w-icon');
let disc=document.getElementById('w-disc');
let high=document.getElementById('w-high');
let low=document.getElementById('w-low');
let humidity=document.getElementById('w-hum');
let  bg=document.getElementById('w-bg');
let err=document.getElementById('w-err');

document.addEventListener('DOMContentLoaded', getWeather);

function kelvTof(k){
  return(Math.floor((k-273) * (9/5) + 32));
}


function getWeather(){
  weather.getWeather()
    .then(results => {
      cityname.textContent=results.name;
      temp.textContent=`${kelvTof(results.main.temp)}℉`;
      disc.textContent=results.weather[0].description;
      high.textContent=`${kelvTof(results.main.temp_max)}℉`;
      low.textContent=`${kelvTof(results.main.temp_min)}℉`;
      humidity.textContent=`${(results.main.humidity)}`
      icon.setAttribute('src', `http://openweathermap.org/img/wn/${results.weather[0].icon}@2x.png`); 
      err.textContent='';
      const a=kelvTof(results.main.temp);
      if ( a > 70) 
        bg.style.background='radial-gradient(577.51% 120.03% at 47.46% 102.72%, #883100 26.72%, #FFDA7B 100%)';
      
      else if(a >= 50 && a < 70)
        bg.style.background=  "radial-gradient(613.75% 145.54% at -11.79% 120.42%, #43BBFF 26.72%, #FFD464 94.13%)";
       
      else  
      bg.style.background='radial-gradient(577.51% 120.03% at 47.46% 102.72%, #005788 26.72%, #7BD0FF 100%)';
     
    })
    .catch(err => {
      err.textContent='Double-check your input';
      icon.setAttribute('src', `https://www.pngkey.com/png/full/395-3958556_sad-puppy-cartoon-.png`);
    });

}




