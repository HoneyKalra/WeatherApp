import React, { useEffect, useState } from "react";
import "./weather.css";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
function Weather() {
  const apiKey = "7baf326eb291c2e30faf7873305e31b4";
  const unit = "metric";
  const weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let d = new Date();
  let secondsNow = Number(d.getSeconds());
  let presentDay = weekDay[d.getDay()];
  let presentHours = d.getHours();
  let minutesNow = Number(d.getMinutes());

  minutesNow = minutesNow > 9 ? minutesNow : "0" + minutesNow;

  const [city, setCity] = useState("");
  const [info, setInfo] = useState({});

  const [day, setDay] = useState(presentDay);
  const [hours, setHours] = useState(presentHours);
  const [minutes, setMinutes] = useState(minutesNow);

  const [seconds, setSeconds] = useState(secondsNow);

  useEffect(() => {
    const secInterval = setInterval(() => {
      seconds >= 59 ? setSeconds(0) : setSeconds((seconds) => seconds + 1);
      seconds >= 59
        ? setMinutes((prevMinutes) => prevMinutes + 1)
        : setMinutes(minutesNow);
    }, 1000);
    return () => clearInterval(secInterval);
  }, [seconds]);

  setInterval(function () {
    setHours(presentHours);
  }, 3600000);

  function handleChange(event) {
    let { value } = event.target;
    setCity(value);
  }
  function weatherSearch() {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
      )
      .then((response) => {
        console.log(response);
        setInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
        setInfo("");
      });
    setCity("");
  }

  return (
    <div className="container">
      <div
        style={{
          marginTop: "-50px",
          marginBottom: "-130px",
        }}
      >
        <h1 style={{ marginLeft: "710px", marginTop: "50px" }}>
          {day},{hours > 12 ? hours - 12 : hours}:
          {minutes > 9 ? minutes : "0" + minutes} {hours > 12 ? "AM" : "PM"}
        </h1>
        <img
          style={{ marginLeft: "710px", marginTop: "-30px" }}
          src="/imgs/cloud.png"
        ></img>
      </div>
      <div
        style={{
          margin: "auto",
          width: "850px",
        }}
      >
        <input
          className="inputs"
          type="text"
          placeholder="ENTER CITY... "
          value={city}
          onChange={handleChange}
        />
        <button className="btn" onClick={weatherSearch}>
          <BsSearch />
        </button>
      </div>

      {info.name ? (
        <div className="tempInfo">
          <p>CITY:{info?.name}</p>
          <p>TEMP:{info?.main.temp}℃</p>
          <p>FEELS LIKE:{info?.main.feels_like}℃</p>
          <p>MIN TEMP:{info?.main.temp_min}℃</p>
          <p>MAX TEMP:{info?.main.temp_max}℃</p>
        </div>
      ) : (
        <div style={{ margin: "70px auto" }}>
          <h1 className="city">ENTER A VALID CITY NAME..</h1>
        </div>
      )}
    </div>
  );
}

export default Weather;
