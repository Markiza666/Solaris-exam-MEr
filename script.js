// Globala konstanter för att komma åt HTML DOM(document object model) objekt
const starPlanet = document.getElementById('starPlanet');
const merkurius = document.getElementById('merkurius');
const venus = document.getElementById('venus');
const earth = document.getElementById('earth');
const mars = document.getElementById('mars');
const jupiter = document.getElementById('jupiter');
const saturn = document.getElementById('saturn');
const uran = document.getElementById('uran');
const neptun = document.getElementById('neptun');
const header = document.getElementById('header');
const planets = document.getElementById('planets');

// Global konstant för att komma åt modal / popup /overlay som presenterar information om solsystemets delar
const popup = document.getElementById('popup');


// Variabel för solsystemsdata som fylls på vid API-hämtning av informationen från server på internet
let systemData = [];    // Blir en array med arrayer/object

// Global konstant med adress att hämta nyckel och information ifrån (används i flera funktioner)
const url = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com"
  
// Hämtar API nyckel och fortsätter med att hämta DATA
let getKey = () => {
    // Konstanter för att hämta nyckel
    const keyEndpoint = '/keys';
    const keyOptions = {
        method: 'POST' 
    }
    // Fetch är en async function som har await i .then och .catch. Detta är det kortaste sättet att skriva som ändå fångar fel som kan uppstå. Att använda try/catch är till för att fånga fel i synkrona funktioner. Här i async funktion fångas felet med .catch
    fetch(url + keyEndpoint, keyOptions)
    .then(res => res.json())
    .then(res =>  getPlanetaryInfo('' + res.key)) // Tar ut API-nyckeln och säkerställer att den verkligen skickas vidare som en sträng.
    .catch(err => console.error(err));
}

    // Hämtar DATA med hjälp av hämtad API nyckel
let getPlanetaryInfo = (key) => {
    // Konstanter för att hänta informationen med hjälp av nyckel 
    const infoEndpoint = '/bodies';
    const infoOptions = {
        method: 'GET', 
        headers: {'x-zocom': '' + key}
    }
    fetch(url + infoEndpoint, infoOptions)
    .then(res => res.json())    // json() omvandlar ett JSON-objekt till ett Javascript-objekt
    .then(res => saveInfoToLocal(res))
    .catch(err => console.error(err));
}

    // Sparar hämtat DATA i förberedda variabler
let saveInfoToLocal = (data) => {
    systemData = data.bodies;   // Sparar all DATA i en array, dvs blir en array med arrayer
}

// Funktion för att öppna modal/popup och presentera informationen
let presentInfo = (dataToPresent) => {
    const starPlanet2 = document.getElementById('starPlanet-eff2');
    const starPlanet3 = document.getElementById('starPlanet-eff3');

    const closeBtn = document.getElementById('close');
    const planetName = document.getElementById('planet-name');
    const planetLatinName = document.getElementById('planet-latin-name');
    const description = document.getElementById('description');
    const circumference = document.getElementById('circumference');
    const distance = document.getElementById('distance');
    const maxTemp = document.getElementById('max-temp');
    const minTemp = document.getElementById('min-temp');
    const moons = document.getElementById('moons');
    let moonNames = '';

    popup.style.display = 'block';
    header.style.visibility = 'hidden';
    planets.style.visibility = 'hidden';
    starPlanet.style.backgroundColor = 'rgba(66, 142, 212, 1)';
    starPlanet2.style.display = 'block';
    starPlanet3.style.display = 'block';

    closeBtn.addEventListener('click', 
        function() {
            popup.style.display = 'none';
            header.style.visibility = 'visible';
            planets.style.visibility = 'visible';
            starPlanet.style.backgroundColor = 'rgba(255, 208, 41, 1)';
            starPlanet2.style.display = 'none';
            starPlanet3.style.display = 'none';
        });

    planetName.innerHTML = dataToPresent.name;
    planetLatinName.innerHTML = dataToPresent.latinName;
    description.innerHTML = dataToPresent.desc;
    circumference.innerHTML = dataToPresent.circumference + ' km';
    distance.innerHTML = dataToPresent.distance + ' km';
    maxTemp.innerHTML = dataToPresent.temp.day + ' &#176 C';
    minTemp.innerHTML = dataToPresent.temp.night + ' &#176 C';

    // Kolla om array för månar är tom, om inte kör loop för att plocka ut månar till en string
    if (dataToPresent.moons.length !== 0) {
        for (let name in dataToPresent.moons) {
            moonNames = moonNames + dataToPresent.moons[name] + ', ';
        }
        // Klipp bort sista kommat
        moonNames = moonNames.substring(0, (moonNames.length - 2));
    } else {
        // Om det inte finns månar så sätt variabel till 'Inga'
        moonNames = 'Inga';
    }
    moons.innerHTML = moonNames;    
}

// Kör funktionen när scriptet laddats
getKey();

// Lägger på lyssnare för att kunna klicka på solsystemets delar och få fram information
starPlanet.addEventListener ('click', () => {presentInfo(systemData[0])});
merkurius.addEventListener('click', () => {presentInfo(systemData[1])});
venus.addEventListener('click', () => {presentInfo(systemData[2])});
earth.addEventListener('click', () => {presentInfo(systemData[3])});
mars.addEventListener ('click', () => {presentInfo(systemData[4])});
jupiter.addEventListener('click', () => {presentInfo(systemData[5])});
saturn.addEventListener('click', () => {presentInfo(systemData[6])});
uran.addEventListener('click', () => {presentInfo(systemData[7])});
neptun.addEventListener('click', () => {presentInfo(systemData[8])});