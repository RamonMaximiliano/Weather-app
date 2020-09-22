window.addEventListener("load", ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
/*             const api = `https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/37.8267,-122.4233`;     */
            const proxy = "https://cors-anywhere.herokuapp.com/";  
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;  

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                const {temperature, summary, icon} = data.currently;
                //Set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //Formula for Celsius
                let celsius = (temperature - 32) * (5/9);

                //set icon
                setIcons(icon, document.querySelector(".icon"));

                //change to celsius/Farenheit

                temperatureSection.addEventListener("click", () => {
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;

                    } 
                });
            });
        });
    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);

    }



});



/* 
}else{
    h1.textContent = "Hey pal, it is not wworking because you did not allowed to"
}

*/