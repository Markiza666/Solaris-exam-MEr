// **************************************************
// Modul med funktionerna som presenterar informationen i modal-popup
// Har lagt alla presentationsfunktioner i denna modul för att få enkel överblick
// **************************************************

//Importerar variabler/pekare som behövs
import { systemData } from './apiRequests.js';
import { domObjects, modalElements } from './domElements.js'; 
import { planetColors } from './variables.js';

// Öppnar modalen för att visa information om klickad himlakropp med korrekt färg till vänster
const showModal = (color) => {

    // Visar modalen med de extra färgringarna och döljer bakomliggande element
    domObjects.popup.style.display = 'block';
    domObjects.header.style.visibility = 'hidden';
    domObjects.planets.style.visibility = 'hidden';
    domObjects.starPlanet.style.backgroundColor = color;
    modalElements.atmosphere.style.display = 'block';
    modalElements.atmosphere.style.backgroundColor = color;
    modalElements.atmosphere.style.opacity ='0.35';
    modalElements.corona.style.display = 'block';
    modalElements.corona.style.backgroundColor = color;
    modalElements.corona.style.opacity ='0.25';

    // Lägger lyssnare på stängningsknappen och säger vad som ska hända
    modalElements.closeBtn.addEventListener('click', () => {
            domObjects.popup.style.display = 'none';
            domObjects.header.style.visibility = 'visible';
            domObjects.planets.style.visibility = 'visible';
            domObjects.starPlanet.style.backgroundColor = '' + planetColors.starPlanet;
            modalElements.atmosphere.style.display = 'none';
            modalElements.corona.style.display = 'none';
        }
    );
}

// Lägger in informationsdetaljer i modalen
const showDetails = (details) => {
    
    modalElements.planetName.innerText = details.name;
    modalElements.planetLatinName.innerText = details.latinName;
    modalElements.description.innerText = details.desc;
    modalElements.circumference.innerText = details.circumference + ' km';
    modalElements.distance.innerText = details.distance + ' km';
    modalElements.maxTemp.innerHTML = details.temp.day + ' &deg C';             // Måste vara innerHTML för att kunna visa grad-symbol
    modalElements.minTemp.innerHTML = details.temp.night + ' &#176 C';          // Måste vara innerHTML för att kunna visa grad-symbol
}

// Lägger in eventuella månar i modalen
const showMoons =(planetInfo) => {
    
    if(planetInfo.moons.length === 0) {
        modalElements.moons.innerText = planetInfo.name + ' har inga månar';
    }
    else{
        modalElements.moons.innerText = planetInfo.moons.join(', ');
    }
}

// Funktionen för att öppna modal/popup och presentera informationen
let presentInfo = (dataToPresent, colorKey) => {
    showModal(colorKey);
    showDetails(dataToPresent);
    showMoons(dataToPresent);
}

export { presentInfo }