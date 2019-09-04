

const pairObject = require('./pairObject.js')
const parserObject = require('./parserObject.js')
const GUIManager = require('./GUIManager.js')
const fileManager = require('./fileManager.js')
const fs = require("fs");



module.exports = class Model {


    // The model class aggregates objects of 
    // Pair, parserObject, GUIManager, fileManager
    constructor(appReference){

        console.log("(3) Initializing Model");

        this.pairList = [];
        this.pairObject = new pairObject("unit");
        this.Parser = new parserObject(appReference);
        this.GUI = new GUIManager(appReference);
        this.fileManager = new fileManager(fs, appReference);
        this.id = "- Application Model -";
        this.app = appReference;

        console.log("Model App Reference: " + this.app.id);


    }

}