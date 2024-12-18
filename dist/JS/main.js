import { getKeyAndSolarSystemData, systemData } from './apiRequests.js';
import { domObjects } from './domElements.js';
import { presentInfo } from './modalFunctions.js';
import { planetColors } from './variables.js';


// Kör funktion för att hämta data genom API
getKeyAndSolarSystemData();
 

// Funktion för att lägga alla händelselyssnare på solen och planeterna
const initiatePage = () => {
    // Nollställer en räknare (c = counter)
    let c = 0;
    // Loopar igenom arrayen för planeternas färger för att ta ut planetnamnet (key)
    for (const key in planetColors) {
        let z = c;      // Sparar nuvarande värde av "c" till en ny variabel "z" för att kunna skilja varje lyssnare åt
        // Kontrollerar att object har både värde och nyckel 
        if (Object.prototype.hasOwnProperty.call(planetColors, key)) {
            domObjects[key].addEventListener('click', () => {
                presentInfo(systemData[z], planetColors[key])       // Lägger en händelselyssnare på solen och planeterna
            });
            c++;
        }
    }
}

initiatePage();