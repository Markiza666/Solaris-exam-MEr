// **************************************************
//Modul med funktionerna för att hämta API data för att enkelt återanvända till andra projekt
// **************************************************


// Array för att lägga informationen i
let systemData = [];    

// Global konstant (i modulen) med adress att hämta nyckel och information ifrån (används i flera funktioner)
const baseUrl = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com"

// Hämtar API nyckel och fortsätter med att hämta DATA
const getKeyAndSolarSystemData = () => {

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
const getPlanetaryInfo = (key) => {

    // Konstanter för att hämta informationen med hjälp av nyckel 
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
const saveInfoToLocal = (data) => {
    systemData = data.bodies;   // Sparar all DATA i en array, dvs blir en array med arrayer
    }

    
export {getKeyAndSolarSystemData, systemData};