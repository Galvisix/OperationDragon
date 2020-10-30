let chai = require("chai");
const assert = chai.assert;

const utilities = require("../src/utilities")
const generateDistances = require("../src/generateDistances")

describe("Test utilities", function(){
    describe("#getLocation(...distances)", function(){

        it("Should return a valid location when distances are consistent", function(){
            const distancesAndLocation = generateDistances();
            const r1 = distancesAndLocation.r1;
            const r2 = distancesAndLocation.r2;
            const r3 = distancesAndLocation.r3;
            const result = utilities.getLocation(r1, r2, r3);
            const validResult = distancesAndLocation.sourceLocation;
            const delta = 0.01;
            assert.approximately(result.x, validResult.x, delta);
            assert.approximately(result.y, validResult.y, delta);

        })
    })

    describe("#validateDistances(...distances)", function(){

        it("Should throw an error when distances are not consistent", function(){
            const r1 = 10;
            const r2 = 9;
            const r3 = 20;
            const fn = () => utilities.validateDistances(r1, r2, r3);

            assert.throw(fn, "Inconsistent distances");
        })

        it("Should return true when distances are consistent", function(){
            const distancesAndLocation = generateDistances();
            const r1 = distancesAndLocation.r1;
            const r2 = distancesAndLocation.r2;
            const r3 = distancesAndLocation.r3;
            const result = utilities.validateDistances(r1, r2, r3);
            const validResult = true;

            assert.strictEqual(result, validResult);
        })
    })

    describe("#validateLocation(location, r1, r2, r3)", function(){

        it("Should return true when distances are consistent", function(){
            const distancesAndLocation = generateDistances();
            const r1 = distancesAndLocation.r1;
            const r2 = distancesAndLocation.r2;
            const r3 = distancesAndLocation.r3;
            const location = utilities.getLocation(r1, r2, r3);
            const result = utilities.validateLocation(location, r1, r2, r3);
            const validResult = true;
            assert.strictEqual(result, validResult);
        })

        it("Should throw an error when distances are not consistent", function(){
            const distancesAndLocation = generateDistances();
            const r1 = distancesAndLocation.r1;
            const r2 = distancesAndLocation.r2;
            const r3 = 52;
            const location = utilities.getLocation(r1, r2, r3);
            const fn = () => utilities.validateLocation(location, r1, r2, r3);
            assert.throw(fn, "Inconsistent distances");
        })
    })


    describe("#getMessage(...messages)", function(){

        it("Should return an empty string when all messages are empty", function(){
            const message1 = [];
            const message2 = [];
            const message3 = [];
            const result = utilities.getMessage(message1, message2, message3);
            const validResult = "";
            assert.strictEqual(result, validResult);
        })



        it("Should throw an error when messages are not the same length", function(){
            const message1 = ["a", "", ""];
            const message2 = ["", "b", ""];
            const message3 = ["", "", "", "d"];
            const fn = () => utilities.getMessage(message1, message2, message3);
            assert.throws(fn, "Messages are not the same length");
        })

        it("Should return the merged lists when messages are normal", function(){
            const message1 = ["word1", "", ""];
            const message2 = ["", "word2", ""];
            const message3 = ["", "", "word3"];
            const result = utilities.getMessage(message1, message2, message3);
            const validResult = "word1 word2 word3";
            assert.strictEqual(result, validResult);
        })

        it("Should throw an error when it cannot identify the complete message", function(){
            const message1 = ["", "", ""];
            const message2 = ["", "word2", ""];
            const message3 = ["", "", "word3"];
            const fn = () => utilities.getMessage(message1, message2, message3);
            assert.throws(fn, "Message could not be determined");
        })
    })
})
