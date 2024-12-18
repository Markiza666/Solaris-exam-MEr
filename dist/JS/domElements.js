// **************************************************
// Modul med pekarna för att kunna förändra HTML DOM objekten
// Har delat alla pekare i en modul för att de inte ska finnas på flera ställen i koden
// **************************************************
 

// Objekt/array med pekare till alla element på den grundläggande sidan
const domObjects = {
    starPlanet: document.getElementById('starPlanet'),
    mercury: document.getElementById('mercury'),
    venus: document.getElementById('venus'),
    earth: document.getElementById('earth'),
    mars: document.getElementById('mars'),
    jupiter: document.getElementById('jupiter'),
    saturn: document.getElementById('saturn'),
    uranus: document.getElementById('uranus'),
    neptune: document.getElementById('neptune'),
    header: document.getElementById('header'),
    planets: document.getElementById('planets'),
    popup: document.getElementById('popup')
}

// Objekt/array med pekare till alla element i popup modal som visar detaljinformation
const modalElements = {
    atmosphere: document.getElementById('starPlanet-eff2'),
    corona: document.getElementById('starPlanet-eff3'),
    planetName: document.getElementById('planet-name'),
    planetLatinName: document.getElementById('planet-latin-name'),
    description: document.getElementById('description'),
    circumference: document.getElementById('circumference'),
    distance: document.getElementById('distance'),
    maxTemp: document.getElementById('max-temp'),
    minTemp: document.getElementById('min-temp'),
    moons: document.getElementById('moons'),
    closeBtn: document.getElementById('close') // Skapar en pekare till stängningsknappen, krysset
}



export { domObjects, modalElements }