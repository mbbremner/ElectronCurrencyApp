/*===================================================================*/
/*-----------------------MODULE: Parser -----------------------------
/*===================================================================*/

// for http requesting
const axios = require('axios')

// Fetcher Object 
module.exports = class parserObject {

    // Primary Object Constructor
    constructor(appReference){
        console.log("(3.1) Initializing Parser / DataHandler");
        this.aParser = new DOMParser();  // for parsing XML
        this.symbols = [];               // likely no longer used
        this.elements = [];              // List of Rate elements returned from http request
        this.update = true;             // HTTP requests on/off
        this.app = appReference;
        console.log("Parser App Reference: " + this.app.id);
    }

    // Fetch the XML from the URL   
    getRateXML(gui, callback1, callback2){

        console.log("(4.2) Fetching Initial List");
        
        var tempXML;
        var stringXML;

        axios.get('https://rates.fxcm.com/RatesXML')
        .then(res=>{

            stringXML = res.data;
            tempXML = this.aParser.parseFromString(stringXML,"text/xml");
            this.elements = tempXML.getElementsByTagName("Rate");

            callback1(this.elements, callback2, this, gui);
        })

    }

    /*Populates list of Pair objects from fetched tags*/ 
    popPairList( elements, callback, parserObj, guiObject){

        console.log("(4.3) Populating Pair Object List")
        
        var currElement;
        var bidElements;
        var pairObj;

        for(var k = 0; k < elements.length; k++){

            currElement = elements[k];
            bidElements = currElement.getElementsByTagName("Bid");

            pairObj = new pairObject(currElement.getAttribute('Symbol'));
            pairObj.bid = bidElements[0].innerHTML;
            
            pairList.push(pairObj);
            //this.symbols.push(elements[k].getAttribute('Symbol'));

        }
        parserObj.update = false;
        console.log("Pop. Complete...Calling callback ...")
        /*This sequence ends by calling refresh data*/ 
        return callback(parserObj, guiObject, guiObject.assignEvents);

    }

    /* Refreshes Rates*/
    getRates(callback1, callback2){

        var tempXML;
        var stringXML;
        var elements;
        var currentElement;

        console.log("Fetching Rates");

        axios.get('https://rates.fxcm.com/RatesXML').then(res=>{

            console.log("Response Received");
            stringXML = res.data;
            tempXML = this.aParser.parseFromString(stringXML,"text/xml");
            elements = tempXML.getElementsByTagName("Rate");

            callback1(elements, callback2);
            return(elements);


        })

    }

    // updates the global pairlist with newly fetched data
    updatePairList(elements, callback){

        var currentElement

        // Update pairList
        for(var i = 0; i < pairList.length; i++){

            currentElement = pairList[i];

            if(currentElement.name == elements[i].getAttribute("Symbol")){

                pairList[i].bid = elements[i].getElementsByTagName("Bid")[0].innerHTML;
            }
        }

        // Load sequence ended, disale updating until user chooses
        callback();


    }

    // Active HTTP fetching if fetching is active
    InitializeFetchSequence(parserObj, guiObject, callback){

        console.log("Pairlist Length: " + pairList.length);

        // On interval
        var myInterval = setInterval(function(){
            console.log("Inside Interval Function");
            
            if(parserObj.update == true){
                parserObj.getRates(parserObj.updatePairList, guiObject.refreshView);
            }
            else{
                console.log("Rate fetching disabled");
            }
        }, 5000);

        console.log("Initializing callback");
        callback(guiObject);
    }


    //Gets and sets
    setSymbol(tag){this.symbols.push(tag);}

    getSymbols(){return this.symbols;}

    getLen(){return this.elements.length;}



    /* Refreshes Rates*/
    /*getRates(){

        var tempXML;
        var stringXML;
        var elements;
        var currentElement;

        console.log("Fetching Rates, no callback");

        axios.get('https://rates.fxcm.com/RatesXML').then(res=>{

            console.log("Response Received");
            stringXML = res.data;
            tempXML = this.aParser.parseFromString(stringXML,"text/xml");
            elements = tempXML.getElementsByTagName("Rate");

            console.log("Num Elements: " + elements.length);
            return elements;


        })


    }*/
}