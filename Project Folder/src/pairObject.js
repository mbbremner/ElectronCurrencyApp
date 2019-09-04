/*===================================================================*/
/*---------------------- MODULE: Pair Object -------------------------
/*===================================================================*/


// Primary Pair Object
module.exports = class pairObject {

    // Primary Pair Object Constructor
    constructor(aName){
        this.name = aName;      // Currency symbol
        this.active = false;    // Tracking?
        this.ask = 0;           // ask price
        this.bid = 0;           // bid price
        this.target = "None";   // target price
        this.list =  [];        // 
        this.inList = false;    // Tag if pair is in list or not (for saving)
    }

    // Retrives bid price from pairList
    fetchBid(symbol, list){

        for(var i = 0; i < list.length; i++){

            if(list[i].name == symbol){

                return(list[i].bid);
            }
        }
        return "no data";
    }

    // Retrives fetch price from pairList
    fetchTarget(symbol, list){

        for(var i = 0; i < list.length; i++){

            if(list[i].name == symbol){

                return list[i].target;

            }

        }

        return 0;
    }

    // Retrives fetch price from pairList
    fetchActive(symbol, list){

        for(var i = 0; i < list.length; i++){

            if(list[i].name == symbol){

                return list[i].active;

            }

        }

        return 0;
    }

    //Send the target and symbol to the GUI & activate tracking
    setTarget(/*targetDiv,*/ targetIn, symbol){

        //console.log("Target div ID: " + targetDiv.id);

        for(var i = 0; i < pairList.length; i++){
        
            if(pairList[i].name == symbol){

                pairList[i].target = targetIn;

                console.log("Target Set:" + symbol + ": " + pairList[i].targetPrice);
                //document.getElementById(targetDiv).innerHTML = targetIn;

            }
        }

    }

    // Toggle active tracking for pair object
    toggleActive(inputID, buttonID, symbol){



        console.log("Toggle Activate tracking for " + symbol);


        var buttonElement = document.getElementById(buttonID);
        var inputElement = document.getElementById(inputID);
        var inputVal = inputElement.value
    
        // Input filter, only integers & decimals
        var inputRegex = /^\d*(\.)*\d*$/;


        if(inputRegex.test(String(inputVal))){
    
            console.log("Valid Target Input");
    
            // Parse pairlist and activate the pair which matches symbol
            for(var i = 0; i < pairList.length; i++){
    
                if(pairList[i].name == symbol){

                    this.inList = true;
                    console.log("In list? : " + this.inList);

                   // If active --> deactivate
                   if(pairList[i].active){
                       pairList[i].active = false;
                       buttonElement.style.backgroundColor = "#353535";
                       buttonElement.style.fontWeight = "normal";
                       buttonElement.style.fontSize = "14px";
                   }
                   // If inactive --> activate
                   else{
                       pairList[i].active = true;
                       buttonElement.style.backgroundColor = "#3d7a4f";
                       buttonElement.style.fontWeight = "bold";
                       buttonElement.style.fontSize = "16px";
                   }
               }
           }
        
        }
    
        else{
            alert("Bad Input: Numbers Only");
    
            // Reset active tracking to false
            for(i = 0; i < pairList.length; i++){
        
                if(pairList[i].name == symbol){
    
                    pairList[i].active = false;
                }
            }
        }
    
    }

    toString(){

        return String(this.name) +"," + String(this.bid) + "," + String(this.target) + "," + this.inList + "\n";

    }


}