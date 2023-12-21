import React, { useEffect, useRef, useState } from "react";
import "./CountryClock.scss";
import { useNavigate } from "react-router-dom";

const CountryClock = () => {
  const [countries, setCountries] = useState(null);
  const [countryTime, setCountryTime] = useState(null);
  const [isStarted, setIsStarted] = useState(true);
  const ref = useRef();
  const navigate = useNavigate();
  async function getCountries() {
    let allCountries = await fetch("https://worldtimeapi.org/api/timezone");
    let countriesData = await allCountries.json();
    setCountries(countriesData);
  }
  function backButtonHandler() {
    navigate("/");
  }
  const selectCountryHandler = async (e) => {
    try {
      const response = await fetch(
        `https://worldtimeapi.org/api/timezone/${e.target.value}`
      );
      const data = await response.json();
      let countryDateTime = data.datetime;
      let formettedTime = countryDateTime
        ?.split("T")[1]
        ?.split(".")[0]
        .split(":");
      setCountryTime({
        hour: formettedTime[0],
        min: formettedTime[1],
        sec: formettedTime[2],
      });
    } catch (error) {
      console.error("Error Occured! while fetching country time");
    }
  };
  function startWatch() {
    setIsStarted(true);
    ref.current = setInterval(() => {
      setCountryTime((previousTime) => {
        if (
          previousTime.sec == 59 &&
          previousTime.min !== 59 &&
          previousTime.hour !== 23
        ) {
          return {
            hour: Number(previousTime.hour),
            min: Number(previousTime.min) + 1,
            sec: 0,
          };
        }
        if (
          previousTime.min == 59 &&
          previousTime.sec == 59 &&
          previousTime.hour !== 23
        ) {
          return {
            hour: Number(previousTime.hour) + 1,
            min: 0,
            sec: 0,
          };
        }
        if (
          previousTime.hour == 23 &&
          previousTime.min == 59 &&
          previousTime.sec == 59
        ) {
          return {
            hour: 0,
            min: 0,
            sec: 0,
          };
        }
        return {
          hour: Number(previousTime.hour),
          min: Number(previousTime.min),
          sec: Number(previousTime.sec) + 1,
        };
      });
    }, 1000);
  }
  function stopWatch() {
    clearInterval(ref.current);
    setIsStarted(false);
  }
  useEffect(() => {
    getCountries();
  }, []);
  useEffect(() => {
    if (isStarted && countryTime) {
      startWatch();
    }
    return () => {
      clearInterval(ref.current);
    };
  }, [isStarted, countryTime]);
  return (
    <div className="clockContainer">
      <button onClick={backButtonHandler} className="backButton">
        Back
      </button>
      <select onChange={selectCountryHandler} className="selectDropdown">
        <option className="dropdownOptions" value="">
          Select a Country
        </option>
        {countries?.map((country, i) => {
          return (
            <option className="dropdownOptions" key={i} value={country}>
              {country}
            </option>
          );
        })}
      </select>
      <div className="start-stopContainer">
        <div className="clock">
          {countryTime
            ? `${
                Number(countryTime.hour) < 10
                  ? `0${Number(countryTime.hour)}`
                  : `${countryTime.hour}`
              } : ${
                Number(countryTime.min) < 10
                  ? `0${Number(countryTime.min)}`
                  : `${countryTime.min}`
              } : ${
                Number(countryTime.sec) < 10
                  ? `0${Number(countryTime.sec)}`
                  : `${countryTime.sec}`
              }`
            : "00:00:00"}
        </div>
        <div>
          {isStarted ? (
            <button className="start-stopButton" onClick={stopWatch} disabled={countryTime==null}>
              Stop
            </button>
          ) : (
            <button className="start-stopButton" onClick={startWatch}>
              Start
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryClock;
