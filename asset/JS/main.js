
// Globala konstanter för att komma åt HTML DOM(document object model) objekt
const starPlanet = document.getElementById('starPlanet');
const mercury = document.getElementById('merkurius');
const venus = document.getElementById('venus');
const earth = document.getElementById('earth');
const mars = document.getElementById('mars');
const jupiter = document.getElementById('jupiter');
const saturn = document.getElementById('saturn');
const uranus = document.getElementById('uran');
const neptune = document.getElementById('neptun');
const header = document.getElementById('header');
const planets = document.getElementById('planets');

// färger till planeterna och solen.
let planetColors = {
    sun: "rgb(255, 208, 41)",
    mercury: "rgb(136, 136, 136)",
    venus: "rgb(231, 205, 205)",
    earth: "rgb(66, 142, 212)",
    mars: "rgb(239, 95, 95)",
    jupiter: "rgb(226, 148, 104)",
    saturn: "rgb(199, 170, 114)",
    uranus: "rgb(201, 212, 241)",
    neptune: "rgb(122, 145, 167)"
}

// Fixar stylingen från början till rätt färger
starPlanet.style.backgroundColor = planetColors.sun;
mercury.style.backgroundColor = planetColors.mercury;
venus.style.backgroundColor = planetColors.venus;
earth.style.backgroundColor = planetColors.earth;
mars.style.backgroundColor = planetColors.mars;
jupiter.style.backgroundColor = planetColors.jupiter;
saturn.style.backgroundColor = planetColors.saturn;
uranus.style.backgroundColor = planetColors.uranus;
neptune.style.backgroundColor = planetColors.neptune;

// Global konstant för att komma åt modal / popup /overlay som presenterar information om solsystemets delar
const popup = document.getElementById('popup');

const showModal = (color) => {
    starPlanet.removeEventListener ('click', () => {
        presentInfo(systemData[0], planetColors.sun)
});
const starPlanet2 = document.getElementById('starPlanet-eff2');
const starPlanet3 = document.getElementById('starPlanet-eff3');

popup.style.display = 'block';
header.style.visibility = 'hidden';
planets.style.visibility = 'hidden';
starPlanet.style.backgroundColor = color;
starPlanet2.style.display = 'block';
starPlanet2.style.backgroundColor = color;
starPlanet2.style.opacity ='0.35';
starPlanet3.style.display = 'block';
starPlanet3.style.backgroundColor = color;
starPlanet3.style.opacity ='0.25';

const closeBtn = document.getElementById('close');

closeBtn.addEventListener('click', 
    function() {
        popup.style.display = 'none';
        header.style.visibility = 'visible';
        planets.style.visibility = 'visible';
        starPlanet.style.backgroundColor = '' + planetColors.sun;
        starPlanet2.style.display = 'none';
        starPlanet3.style.display = 'none';
        starPlanet.addEventListener ('click', () => {
            presentInfo(systemData[0], planetColors.sun)
        });
    });

}

const showDetails = (details) => {
    const planetName = document.getElementById('planet-name');
    const planetLatinName = document.getElementById('planet-latin-name');
    const description = document.getElementById('description');
    const circumference = document.getElementById('circumference');
    const distance = document.getElementById('distance');
    const maxTemp = document.getElementById('max-temp');
    const minTemp = document.getElementById('min-temp');
    
    planetName.innerHTML = details.name;
    planetLatinName.innerHTML = details.latinName;
    description.innerHTML = details.desc;
    circumference.innerHTML = details.circumference + ' km';
    distance.innerHTML = details.distance + ' km';
    maxTemp.innerHTML = details.temp.day + ' &#176 C';
    minTemp.innerHTML = details.temp.night + ' &#176 C';
}

const showMoons =(planetInfo) => {

    const moons = document.getElementById('moons');

    let moonNames = '';
     // Kolla om array för månar är tom, om inte kör loop för att plocka ut månar till en string
     if (planetInfo.moons.length !== 0) {
        for (let name of planetInfo.moons) {
            moonNames = moonNames + name + ', ';
        }
        // Klipp bort sista kommat
        moonNames = moonNames.substring(0, (moonNames.length - 2));
    } else {
        // Om det inte finns månar så sätt variabel till 'Inga'
        moonNames = 'Inga';
    }
    moons.innerText = moonNames; 
}

// Funktion för att öppna modal/popup och presentera informationen
let presentInfo = (dataToPresent, colorKey) => {
    
    showModal(colorKey);
    showDetails(dataToPresent);
    showMoons(dataToPresent);
}


// För att minska antalet rader med kod läggs allt i en array    
let systemData = [];    

// Global konstant med adress att hämta nyckel och information ifrån (används i flera funktioner)
const baseUrl = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com"
    
// Hämtar API nyckel och fortsätter med att hämta DATA
let getKeyAndSolarSystemData = () => {

    // Konstanter för att hämta nyckel
    const keyEndpoint = '/keys';
    const keyOptions = {
        method: 'POST' 
    }

    // Fetch är en async function som har await i .then och .catch. Detta är det kortaste sättet att skriva som ändå fångar fel som kan uppstå. Att använda try/catch är till för att fånga fel i synkrona funktioner. Här i async funktion fångas felet med .catch
    fetch(baseUrl + keyEndpoint, keyOptions)
    .then(res => res.json())
    .then(res =>  getPlanetaryInfo('' + res.key))
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
    fetch(baseUrl + infoEndpoint, infoOptions)
    .then(res => res.json())
    .then(res => saveInfoToLocal(res))
    .catch(err => console.error(err));
}

// Sparar hämtat DATA i förberedda variabler
let saveInfoToLocal = (data) => {
systemData = data.bodies;   // Sparar all DATA i en array, dvs blir en array med arrayer
}

getKeyAndSolarSystemData();

 
   
// Lägger på lyssnare för att kunna klicka på solsystemets delar och få fram information
starPlanet.addEventListener ('click', () => {
    presentInfo(systemData[0], planetColors.sun)
});
merkurius.addEventListener('click', () => {
    presentInfo(systemData[1], planetColors.mercury)}
);
venus.addEventListener('click', () => {
    presentInfo(systemData[2], planetColors.venus)
});
earth.addEventListener('click', () => {
    presentInfo(systemData[3], planetColors.earth)
});
mars.addEventListener ('click', () => {
    presentInfo(systemData[4], planetColors.mars)
});
jupiter.addEventListener('click', () => {
    presentInfo(systemData[5], planetColors.jupiter)
});
saturn.addEventListener('click', () => {
    presentInfo(systemData[6], planetColors.saturn)
});
uran.addEventListener('click', () => {
    presentInfo(systemData[7], planetColors.uranus)
});
neptun.addEventListener('click', () => {
    presentInfo(systemData[8], planetColors.neptune)
});