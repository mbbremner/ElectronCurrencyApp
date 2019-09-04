
/*===================================================================*/
/*--------------------- -MODULE: Application ------------------------
/*===================================================================*/

const Controller = require('./Controller.js')
const Model = require('./Model.js')
const unitTester = require('./unitTester.js')

module.exports = class MyApplication {

    // Application Object Constructor
    // The application aggregates a Controller and a Model
    // (And a unit tester)
    constructor(){

        console.log("(1) Initializing Application");



        // Initialize and pass application referance
        this.Controller = new Controller(this);
        this.Model = new Model(this);
        this.unitTester = new unitTester(this);

        this.id = "CurrTrackerV5.1 Launch Application";
        console.log("App Reference: " + this.id);
    }

}