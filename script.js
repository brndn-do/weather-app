"use strict";

const API_KEY = "VBPR2EFA2K9YLQBQ9QWU662R3";

async function getWeather(location) {
  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`;
    const data = await fetch(url, { mode: "cors" });
    const json = await data.json();
    return json;
  } catch (err) {
    throw new Error("Unable to fetch weather data");
  }
}

function processJson(json) {
  if (json && json.currentConditions) {
    return {
      condition: json.currentConditions.conditions,
      temp: json.currentConditions.temp,
    };
  } else {
    throw new Error("Unable to process fetched weather data");
  }
}

const locationInput = document.getElementById("location");
const submitButton = document.querySelector("button");
const condition = document.querySelector(".condition");
const temp = document.querySelector(".temp");

function displayWeather(data) {
  condition.textContent = data.condition;
  temp.textContent = data.temp;
}

function displayError(err) {
  condition.textContent = err;
  temp.textContent = "";
}

async function handleSubmit(e) {
  e.preventDefault();
  try {
    const json = await getWeather(locationInput.value);
    const processed = processJson(json);
    displayWeather(processed);
  } catch (err) {
    console.error(err);
    displayError(err);
  }
}

submitButton.addEventListener("click", handleSubmit);
