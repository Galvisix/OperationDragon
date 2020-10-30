const utilities = require("./utilities");



function processPost(req, res) {
    try {
    const data = req.body;
    validateData(data);
    validateDistances(data);
    const location = calculateAndValidateLocation(data);
    const message = findMessage(data);
    return buildResponse(location, message, res);
}
catch(error){
        handleError(error, res);
}
}



function validateData(data){
    if(typeof data !== "object")
        throw new Error("Data is not a valid object");
    if(!data.hasOwnProperty("satellites"))
        throw new Error("Missing field satellites");
    if(!Array.isArray(data.satellites))
        throw new Error("satellites must be an array");
    if(data.satellites.length === 0)
        throw new Error("satellites cannot be empty");

    for(let satellite of data.satellites){
        validateSatellite(satellite);
    }
    return true;
}

function validateSatellite(satellite){
    const validNames = ["kenobi", "skywalker", "sato"];
    if(!satellite.hasOwnProperty("name"))
        throw new Error("Missing field name");
    if(!satellite.hasOwnProperty("distance"))
        throw new Error("Missing field distance");
    if(!satellite.hasOwnProperty("message"))
        throw new Error("Missing field message");

    if(!validNames.includes(satellite.name))
        throw new Error("Invalid name. Valid values: kenobi, skywalker, sato");
    if(!Array.isArray(satellite.message))
        throw new Error("message must be an array");
    return true;
}

function validateDistances(data){
    const r1 = data.satellites.find(s => s.name === "kenobi").distance;
    if(typeof r1 !== "number")
        throw new Error("distance must be a number");
    const r2 = data.satellites.find(s => s.name === "skywalker").distance;
    if(typeof r2 !== "number")
        throw new Error("distance must be a number");
    const r3 = data.satellites.find(s => s.name === "sato").distance;
    if(typeof r3 !== "number")
        throw new Error("distance must be a number");

    utilities.validateDistances(r1, r2, r3);
    return true;
}

function calculateAndValidateLocation(data){
    const r1 = data.satellites.find(s => s.name === "kenobi").distance;
    const r2 = data.satellites.find(s => s.name === "skywalker").distance;
    const r3 = data.satellites.find(s => s.name === "sato").distance;
    const location = utilities.getLocation(r1, r2, r3);
    utilities.validateLocation(location, r1, r2, r3);
    return location;
}

function findMessage(data){
    const m1 = data.satellites.find(s => s.name === "kenobi").message;
    const m2 = data.satellites.find(s => s.name === "skywalker").message;
    const m3 = data.satellites.find(s => s.name === "sato").message;
    return utilities.getMessage(m1, m2, m3);
}

function buildResponse(location, message, res){
    return res.status(200).jsonp({position: location, message: message});
}

function handleError(error, res){
    console.log(error.stack);
    let status = 400;
    switch(error.message){
        case "Message could not be determined":
            status = 404;
            break;
        case "Inconsistent distances":
            status = 404;
            break;
        default:
            break;
    }
    return res.status(status).jsonp({error: error.message});
}

module.exports = {processPost: processPost};