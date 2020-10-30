const satellites = {
    kenobi: {
        location: { x: 100, y: 100}
    },
    skywalker: {
        location: { x: 50, y: 100}
    },
    sato: {
        location: { x: 100, y: -100}
    }
}



function generateDistances(locationInput){
    let location = locationInput;
    if (location === undefined)
        location = {x: getRandomInt(200), y: getRandomInt(200)};
    const r1 = calculateDistance(satellites.kenobi.location, location);
    const r2 = calculateDistance(satellites.skywalker.location, location);
    const r3 = calculateDistance(satellites.sato.location, location);
    return {
        sourceLocation: location,
      r1: r1,
      r2: r2,
      r3: r3
    };
}

function calculateDistance(location1, location2){
    return Math.sqrt((location1.x - location2.x) * (location1.x - location2.x) + (location1.y - location2.y) * (location1.y - location2.y));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = generateDistances