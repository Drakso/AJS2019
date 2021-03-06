let countryInput = document.getElementById("countryInput");
let getDataBtn = document.getElementById("getData");
let table = document.getElementById("table");
let message = document.getElementById("message");


function populateTable(table, response){
  console.log(table);
  table.style.display = "block";
  table.innerHTML = `          
  <div class="row">
    <div class="col-1 columnHead">Flag</div>
    <div class="col-2 columnHead">Name</div>
    <div class="col-2 columnHead">Population</div>
    <div class="col-1 columnHead">Region</div>
    <div class="col-1 columnHead">Area</div>
    <div class="col-1 columnHead">Capital</div>
    <div class="col-2 columnHead">Currencies</div>
    <div class="col-2 columnHead">Languages</div>
  </div>`
  for (let country of response) {
    table.innerHTML += createRow(country);
  }
}
function createRow(country){
  let currencies = (curr =>{
    let result = "";
    for (let currency of curr) {
      result += ` ${currency.name}(${currency.symbol})`;
    }
    return result;
  })(country.currencies);
  let languages = (lang =>{
    let result = "";
    for (let language of lang) {
      result += ` ${language.name}(${language.nativeName})`;
    }
    return result;
  })(country.languages);
  return `
  <div class="row countryRow" countryCode="${country.alpha3Code}">
    <div class="col-1 column"><img src="${country.flag}"></div>
    <div class="col-2 column">${country.name}</div>
    <div class="col-2 column">${country.population}</div>
    <div class="col-1 column">${country.region}</div>
    <div class="col-1 column">${country.area}</div>
    <div class="col-1 column">${country.capital}</div>
    <div class="col-2 column">${currencies}</div>
    <div class="col-2 column">${languages}</div>
  </div>`
}
function getCountryByCode(code){
  return fetch("https://restcountries.eu/rest/v2/alpha/" + code).then(response => response.json());
}
async function getBorderingCountries(bordering){
  let borderingCountries = [];
  let counter = 0;
  console.log("Neighbours:");
  for (let code of bordering) {
    counter++;
    let country = await getCountryByCode(code);
    console.log(country);
    borderingCountries.push(country);
    if(counter === bordering.length-1){
      return borderingCountries;
    }
  }
}
getDataBtn.addEventListener("click", (e)=>{
  e.preventDefault();
    console.log("Country:");
    getCountryByCode(countryInput.value).then(response => {
      console.log(response);
      getBorderingCountries(response.borders);
      });
  })