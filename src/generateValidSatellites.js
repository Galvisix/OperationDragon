const generateDistances = require("./generateDistances");

function generateSatellites(){
    const distances = generateDistances();
    const satellites =  {
        "satellites":[
        {
            name: "kenobi",
            location: { x: 100, y: 100},
            distance: distances.r1,
            message: []
        },
        {
            name: "skywalker",
            location: { x: 50, y: 100},
            distance: distances.r2,
            message: []
        },
        {
            name: "sato",
            location: { x: 100, y: -100},
            distance: distances.r3,
            message: []
        }
        ]
    }

    return JSON.stringify(satellites);
}

try{
    console.log(generateSatellites());

}
catch(error){
    console.log(error);
}