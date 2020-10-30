const utilities = require("./utilities");

function processGet(req, res){
    try {
        validateDistances(utilities.satellites);
        const location = calculateAndValidateLocation(utilities.satellites);
        const message = findMessage(utilities.satellites);
        return buildResponse(location, message, res);
    }
    catch(error){
        handleError(error, res);
    }
}

function processPost(req, res) {

    try {
        const resourceName = req.params.name;
        validateResourceName(resourceName);
        const data = req.body;
        validateData(data);
        setSatellite(data, utilities.satellites);
        validateDistances(utilities.satellites);
        const location = calculateAndValidateLocation(utilities.satellites);
        const message = findMessage(utilities.satellites);
        return buildResponse(location, message, res);
    }
    catch(error){
        handleError(error, res);
    }
}

function validateResourceName(name){
    const validResources = ["kenobi", "skywalker", "sato"];
    if(!validResources.includes(name))
        throw new Error("Invalid resource name");
    return true;
}



function validateData(data){
    if(typeof data !== "object")
        throw new Error("Data is not a valid object");
    validateSatellite(data);
    return true;
}

function validateSatellite(satellite){

    if(!satellite.hasOwnProperty("distance"))
        throw new Error("Missing field distance");
    if(typeof satellite.distance !== "number")
        throw new Error("distance must be a number");
    if(!satellite.hasOwnProperty("message"))
        throw new Error("Missing field message");

    if(!Array.isArray(satellite.message))
        throw new Error("message must be an array");
    return true;
}

function setSatellite(data, satellites){
    satellites[data.name].distance = data.distance;
    satellites[data.name].message = data.message;
}

function validateDistances(satellites){
    const r1 = satellites.kenobi.distance;
    const r2 = satellites.skywalker.distance;
    const r3 = satellites.sato.distance;
    if(r1 < 0 || r2 < 0 || r3 < 0)
        throw new Error("Not enough information to return a result");

    return true;
}

function calculateAndValidateLocation(data){
    const r1 = data.kenobi.distance;
    const r2 = data.skywalker.distance;
    const r3 = data.sato.distance;
    const location = utilities.getLocation(r1, r2, r3);
    utilities.validateLocation(location, r1, r2, r3);
    return location;
}

function findMessage(data){
    const m1 = data.kenobi.message;
    const m2 = data.skywalker.message;
    const m3 = data.sato.message;
    return utilities.getMessage(m1, m2, m3);
}

function buildResponse(location, message, res){
    return res.status(200).jsonp({position: location, message: message});
}

function handleError(error, res){
    console.log(error.stack);
    let status = 400;
    switch(error.message){
        case "Not enough information to return a result":
            status = 404;
            break;
        default:
            break;
    }
    return res.status(status).jsonp({error: error.message});
}

module.exports = {processPost: processPost, processGet: processGet};