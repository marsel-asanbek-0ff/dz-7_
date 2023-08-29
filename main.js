// main.js
const countryContainer = document.querySelector("#countryContainer");
const filterInput = document.querySelector("#filterInput");
const regionSelect = document.querySelector("#regionSelect");
const searchButton = document.querySelector("#searchButton");
const paginationContainer = document.querySelector(".paginationBody");
const rightButton = document.querySelector(".right");
const leftButton = document.querySelector(".left");

let limit = 20;
let offset = 0;

async function getCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries = await response.json();
    return countries;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

function createCountryCard(country) {
  const card = document.createElement("div");
  card.classList.add("country-card");

  const flag = document.createElement("img");
  flag.classList.add("flag");
  flag.src = country.flags.svg;
  flag.alt = `${country.name.common} Flag`;

  const name = document.createElement("h2");
  name.textContent = country.name.common;

  const capital = document.createElement("p");
  capital.textContent = `Capital: ${country.capital[0]}`;

  const region = document.createElement("p");
  region.textContent = `Region: ${country.region}`;

  card.appendChild(flag);
  card.appendChild(name);
  card.appendChild(capital);
  card.appendChild(region);

  countryContainer.appendChild(card);
}

async function renderCountries(regionFilter) {
  const countries = await getCountries();
  countryContainer.innerHTML = "";

  countries.slice(offset, offset + limit).forEach((country) => {
    if (regionFilter === "all" || country.region === regionFilter) {
      createCountryCard(country);
    }
  });
}

searchButton.addEventListener("click", () => {
  const filterValue = filterInput.value.toLowerCase();
  const countryCards = document.querySelectorAll(".country-card");

  countryCards.forEach((card) => {
    const countryName = card.querySelector("h2").textContent.toLowerCase();
    if (countryName.includes(filterValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

regionSelect.addEventListener("change", () => {
  const selectedRegion = regionSelect.value;
  const filterValue = filterInput.value.toLowerCase();

  const countryCards = document.querySelectorAll(".country-card");

  countryCards.forEach((card) => {
    const countryName = card.querySelector("h2").textContent.toLowerCase();
    const countryRegion = card
      .querySelector("p")
      .textContent.replace("Region: ", "")
      .toLowerCase();

    if (
      (countryName.includes(filterValue) || filterValue === "") &&
      (selectedRegion === "all" || countryRegion === selectedRegion)
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

async function initializeApp() {
  renderCountries("all");
}

initializeApp();
