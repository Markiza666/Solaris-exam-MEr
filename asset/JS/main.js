import { getKeyAndSolarSystemData, systemData } from './apiRequests.js';
import { domObjects } from './domElements.js';
import { presentInfo } from './modalFunctions.js';
import { planetColors } from './variables.js';


//Kör funktion för att hämta data genom API
getKeyAndSolarSystemData();



const initiatePage = () => {
    let c = 0;
    for (const key in planetColors) {
        let z = c;
        if (Object.prototype.hasOwnProperty.call(planetColors, key)) {
            const element = planetColors[key];
            domObjects[key].addEventListener('click', () => {presentInfo(systemData[z], planetColors[key])});
            c++;
        }
    }
}

initiatePage();