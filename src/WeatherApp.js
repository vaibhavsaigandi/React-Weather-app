import { React, useEffect, useRef, useState } from "react";
import { Card } from 'react-bootstrap';
import "./Weathercss.css";
import axios from "axios";

function WeatherApp() {
  const inputRef = useRef(null);
  const [value, setvalue] = useState("");
  const [weather, setWeather] = useState({});
  const [display, setDisplay] = useState(null);

  const OnChange = (e) => {
    setvalue(e.target.value);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  let GetWeather = async () => {
    let response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        value +
        "&units=metric&appid=9466577caa262ef45b5b47cfaa4add3c"
    );
    let data = response.data;
    setWeather(data);
    var temp = data["weather"][0]["main"];
    var tempValue = data["main"]["temp"];
    console.log(data);
    var nameofcity = data["name"];
    console.log(nameofcity);
    var countrynamedata = data["sys"]["country"];
    var descValue = data["weather"][0]["description"];
    var iconid = data["weather"][0]["icon"];
    // setbackimg(iconid)
    var changeBg = () => {
      document.body.style.backgroundImage = `url("icons/${iconid}.png")`;
    };

    var maxtemp = data["main"]["temp_max"];
    var mintemp = data["main"]["temp_min"];
    var feelslike = data["main"]["feels_like"];
    var humidity = data["main"]["humidity"];
    var pressure = data["main"]["pressure"];
    console.log(
      tempValue,
      nameofcity,
      countrynamedata,
      descValue,
      maxtemp,
      mintemp,
      feelslike,
      humidity,
      pressure
    );
    console.log(iconid);

    let backgroundImage = null;
    if (temp) {
      console.log(temp);
      if (temp === "Clear") {
        console.log(descValue);
        backgroundImage = <div className="app-Clear"></div>;
      }
      if (temp === "Thunderstorm") {
        console.log(descValue);
        backgroundImage = <div className="app-Thunderstorm"></div>;
      }
      if (temp === "Drizzle") {
        console.log(descValue);
        backgroundImage = <div className="app-Drizzle"></div>;
      }
      if (temp === "Rain") {
        console.log(descValue,temp);
        backgroundImage = <div className="app-Rain"></div>;
      }
      if (temp === "Snow") {
        console.log(descValue);
        backgroundImage = <div className="app-Snow"></div>;
      }
     
      if (temp === "Clouds") {
        console.log(descValue);
        backgroundImage = <div className="app-Clouds"></div>;
      } 
      if (
        (temp === "Mist" ||
        temp === "Smoke" ||
        temp === "Haze" ||
        temp === "Dust" ||
        temp === "Fog"||
        temp === "Dust" ||
        temp === "Ash" ||
        temp === "Squall" ||
        temp === "Tornado")
      ) {
        console.log(descValue,temp);
        backgroundImage = <div className="app-Atmosphere"></div>;
      }
      else {
        <div className="body" />;
      }
    }
    return (
      <>
        {backgroundImage}
        <div className="apiend">
          <div className="location">
            {/* <h1>hi prends</h1> */}
            <h2 id="cityname">{nameofcity}</h2>
            <h3 id="countryname">{countrynamedata}</h3>
          </div>
          
          <h2 className="temp"> <img src={'/icons/temp.svg' } className="temp-img" />{tempValue}</h2>
          <p className="description">{descValue}</p>
          {/* this.changeBg(); */}
          <p className="maxandmintemp">
            <label htmlFor="">
              Maxtemp:
            </label>
            {maxtemp}
            &nbsp;
            &nbsp;
            {mintemp}
          </p>
          <p className="feelslike">{feelslike}</p>
          <p className="humidityandpressure">
          <img src={'/icons/humidity.svg' } className="humidity-img" />
            {humidity}
            &nbsp;
            <img src={'/icons/pressure.svg' } className="pressure-img" />
            {pressure}
          </p>
        </div>
        {/* // </div> */}
      </>
    );
  };

  return (
    <div>
      <>
        <input
          id="inputbox"
          type="text"
          value={value}
          ref={inputRef}
          onChange={OnChange}
          name="inputbox"
          placeholder="Enter a city name"
        />
        <input
          id="SubmitButton"
          type="button"
          name="Userbutton"
          value="Submit"
          onClick={async () => {
            let newdisplay = await GetWeather();
            setDisplay(newdisplay);
          }}
        />
        <div>{display}</div>
      </>
    </div>
  );
}

export default WeatherApp;
