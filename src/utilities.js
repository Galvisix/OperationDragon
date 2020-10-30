const satellites = {
    kenobi: {
        location: { x: 100, y: 100},
        distance: -1.0,
        message: []
    },
    skywalker: {
        location: { x: 50, y: 100},
        distance: -1.0,
        message: []
    },
    sato: {
        location: { x: 100, y: -100},
        distance: -1.0,
        message: []
    }
}


function validateDistances(r1, r2, r3){
    const d12 = calculateDistance(satellites.kenobi.location, satellites.skywalker.location);
    const d13 = calculateDistance(satellites.kenobi.location, satellites.sato.location);
    const d23 = calculateDistance(satellites.skywalker.location, satellites.sato.location);
    const err = new Error("Inconsistent distances");
    if(r1 > d12 + r2 || r2 > d12 + r1 || r1 + r2 < d12)
        throw  err;
    if(r1 > d13 + r3 || r3 > d13 + r1 || r1 + r3 < d13)
        throw err;
    if(r2 > d23 + r3 || r3 > d23 + r2 || r2 + r3 < d23)
        throw err;
    return true;
}

function calculateDistance(location1, location2){
    return Math.sqrt((location1.x - location2.x) * (location1.x - location2.x) + (location1.y - location2.y) * (location1.y - location2.y));
}


function getLocation(r1, r2, r3){
    const kenobiL = satellites.kenobi.location;
    const skywalkerL = satellites.skywalker.location;
    const satoL = satellites.sato.location;
    const k = r1 * r1 - r2 * r2 - kenobiL.x * kenobiL.x + skywalkerL.x * skywalkerL.x - kenobiL.y * kenobiL.y + skywalkerL.y * skywalkerL.y;
    const q = r1 * r1 - r3 * r3 - kenobiL.x * kenobiL.x + satoL.x * satoL.x - kenobiL.y * kenobiL.y + satoL.y * satoL.y;
    let x0 = 0;
    let x1 = 0;
    let alpha = 0;
    let beta = 1;
    if (kenobiL.x === skywalkerL.x){
        x1 = k / (2 * (skywalkerL.y - kenobiL.y));
        x0 = (q - 2 * x1 * (satoL.y - kenobiL.y)) / (2 * (satoL.x - kenobiL.x));
    }
    else if (kenobiL.y === skywalkerL.y){
        x0 = k / (2 * (skywalkerL.x - kenobiL.x));
        x1 = (q - 2 * x0 * (satoL.x - kenobiL.x)) / (2 * (satoL.y - kenobiL.y));
    }
    else if (kenobiL.x === satoL.x){
        x1 = q / (2 * (satoL.y - kenobiL.y));
        x0 = (k - 2 * x1 * (skywalkerL.y - kenobiL.y)) / (2 *(skywalkerL.x - kenobiL.x));
    }
    else if (kenobiL.y === satoL.y){
        x0 = q / (2 * (satoL.x - kenobiL.x));
        x1 = (k - 2 * x0 * (skywalkerL.x - kenobiL.x)) / (2 *(skywalkerL.y - kenobiL.y));
    }
    else {
        alpha = k * (satoL.y - kenobiL.y) - q * (skywalkerL.y - kenobiL.y);

        beta = (skywalkerL.x - kenobiL.x) * (satoL.y - kenobiL.y) - (satoL.x - kenobiL.x) * (skywalkerL.y - kenobiL.y);
        x0 = alpha / (2 * beta);
        x1 = (q - 2.0 * x0 * (satoL.x - kenobiL.x)) / (2.0 * (satoL.y - kenobiL.y));
    }
    return {x: x0, y: x1};
}

function validateLocation(location, r1, r2, r3){
    const delta = 0.01;
    const validR1 = calculateDistance(location, satellites.kenobi.location);
    const validR2 = calculateDistance(location, satellites.skywalker.location);
    const validR3 = calculateDistance(location, satellites.sato.location);

    const isR1InRange = r1 - validR1 < delta && r1 - validR1 > -1 * delta;
    const isR2InRange = r2 - validR2 < delta && r2 - validR2 > -1 * delta;
    const isR3InRange = r3 - validR3 < delta && r3 - validR3 > -1 * delta;

    if (!isR1InRange || !isR2InRange || !isR3InRange)
        throw new Error("Inconsistent distances");
    return true;
}

function getMessage(m1, m2, m3){
    if (m1.length === 0 || m2.length === 0 || m3.length === 0)
        return "";

    if(m1.length !== m2.length || m1.length !== m3.length)
        throw new Error("Messages are not the same length");

    const resultList = [];


    for(let i = 0; i< m1.length; i++){
        let word = "";
        if(m1[i] !== "") {
            word = m1[i];
            resultList.push(word);
            continue;
        }
        if(m2[i] !== "") {
            word = m2[i];
            resultList.push(word);
            continue;
        }
        if(m3[i] !== "") {
            word = m3[i];
            resultList.push(word);
            continue;
        }
        if(word === "")
            throw new Error("Message could not be determined");
    }


    if(resultList.join(" ").trim() === "")
        return "";
    return resultList.join(" ");
}

const utilities = {
    satellites: satellites,
    validateDistances: validateDistances,
    getLocation: getLocation,
    validateLocation: validateLocation,
    getMessage: getMessage
}

module.exports = utilities;