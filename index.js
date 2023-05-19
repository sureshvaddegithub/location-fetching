const key ="3c8e55759df24a6d984332356db36b4c";

const spanList = document.querySelectorAll(".time-zone .details p span");

const timezone2 = document.querySelector(".time-zone2");
const input = document.getElementById("input");
const btn = document.getElementById("btn");

const addressDetails = document.querySelectorAll(".time-zone2 .details p span");
const invalidAddress = document.getElementById("error");

var requestOptions = {
    method: 'GET',
  };

function fetchLocation(lat,lon){
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=3c8e55759df24a6d984332356db36b4c`, requestOptions)
  .then(response => response.json())
  .then(result => renderItems(result.features[0],spanList))
  .catch(error => console.log('error', error));
}


function renderItems(result,timezone){
     if(timezone == addressDetails){
        timezone2.style.display ="flex";
        invalidAddress.style.display = "none";

     }
    timezone[0].textContent = " "+result.properties.timezone.name;
    timezone[1].textContent = " "+(result.properties.lat).toString();
    timezone[2].textContent =  " "+(result.properties.lon).toString();
    timezone[3].textContent =  " "+result.properties.timezone.offset_STD;
    timezone[4].textContent =  " "+result.properties.timezone.offset_STD_seconds;
    timezone[5].textContent =  " "+result.properties.timezone.offset_DST;
    timezone[6].textContent =  " "+result.properties.timezone.offset_STD_seconds;
    timezone[7].textContent = " "+ result.properties.country;
    timezone[8].textContent =  " "+result.properties.postcode;
    timezone[9].textContent =  " "+result.properties.city;
}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      alert( "Geolocation is not supported by this browser.");
    }
  }


  function showPosition(position) {
    fetchLocation( position.coords.latitude , position.coords.longitude);
  }

  getLocation();

btn.addEventListener("click",()=>{
     let address = input.value;
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${key}`)
    .then(response => response.json())
    .then(result => {
        renderItems(result.features[0],addressDetails)
        input.value = "";
    })
  .catch(showerror);
})

function showerror(){
    invalidAddress.style.display= "grid";
    timezone2.style.display ="none";
}
  