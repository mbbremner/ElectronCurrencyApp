/*===================================================================*/
/*---------------------MODULE: dataModifier -------------------------
/*===================================================================*/

// This Module manages the Creation & Removal of GUI objects, 
// typically when GUI objects are introduced / removed by user input
// Also handles some duties for refreshing / updating User facing values

module.exports = class GUIManager {

    // GUIManager Object
    constructor(appReference){

        console.log("(3.2) Initializing GUI Manager");
        this.count = 0;
        this.ok = true;
        this.numRects = 1;
        this.limit = 1;
        this.self = this;
        this.app = appReference;
        console.log("GUI Manager App Reference: " + this.app.id);
        console.log("GUI Manager Controller Reference: " + this.app.Controller.id);
    }

    // Constructs loaded Rots
    makeLoadRows(loadData, self){

        var data = loadData.split("\n");
        var rowData;

        console.log("Construction Loaded Rows: " + data.length)

        // Make a row
        if(data[0].length > 1){
        // Create a Prototype for each for
            for(var i = 0; i < data.length; i++){
                self.makeNewRow(self);
            }
        }

        // If 10 rows are printed, set GUI.ok to false
        if(self.limit >= 11){
            self.ok = false;
        }

        var elements = document.getElementsByClassName("row");
        // Populate the row elements with the loaded data
        for(var i = 0; i < elements.length; i++){

            rowData = data[i].split(",");
            //console.log("Row data items:" + rowData[0] + " " + rowData[1] + " " + rowData[2] + " " + rowData[3]);
            elements[i].getElementsByClassName("dropbtn")[0].innerHTML = rowData[0];
            elements[i].getElementsByClassName("biddiv")[0].innerHTML = rowData[2];
            elements[i].getElementsByClassName("targetdiv")[0].innerHTML = rowData[3];
            elements[i].getElementsByClassName("targetInField")[0].value = rowData[1];

        }

        console.log("# of loaded items" + data.length);

    }

    // Builds a prototype "New Item" GUI element when User presses "+" button
    // Uses left/right/middle/makeList functions to prepare the .row Element
    makeNewRow(self){
        if(self.limit < 11){

            console.log("Constructing new Row Element");

            // Initialize row elements
            var newRow = document.createElement('div');
            var left = this.makeLeft(self);
            var right = this.makeRight(self);
            var middle = this.makeMiddle(self);

            // Set tags and text content
            newRow.className = "row";
            newRow.id = "row" + String(this.numRects);
            left.className = "left-container";
            middle.className = "middle-container";
            right.className = "right-container";

            // Construct 'newRow' object
            newRow.appendChild(left);
            newRow.appendChild(middle);
            newRow.appendChild(right);

            // Add final product to DOM
            document.getElementById("rowWrapper").appendChild(newRow);

            // Create the dropdown list
            this.makeList("biddiv" + String(this.numRects), "myDropdown" + String(this.numRects), "dropBtn"+String(this.numRects), pairList)

            // row id counter
            this.numRects++;
            this.limit++;

            console.log("New Limit = " + this.limit);
        }
        else{

            console.log("Cannot Make Row, limit reached")
        }

    }

    // Build the left row element
    makeLeft(self){

        // DOM Object identifier #
        var strNum = String(this.numRects);

        // Initialize DOM objects
        var left = document.createElement('div');
        var delButton = document.createElement('div');
        var subtext = document.createElement('div');
        var prices = document.createElement('div');
        var targetdiv = document.createElement('div');
        var biddiv = document.createElement('div');

        // Set tags and text content
        targetdiv.className = "targetdiv";
        targetdiv.id = "targetdiv" + String(this.numRects);
        targetdiv.innerHTML = "00.0000";

        biddiv.id = "biddiv" + String(this.numRects);
        biddiv.className = "biddiv";
        biddiv.innerHTML = "00.0000";

        delButton.id = "delBtn" + String(this.numRects);
        delButton.className = "delbutton";
        delButton.innerHTML = " X ";

        subtext.id = "subtext" + String(this.numRects);
        subtext.className = "subtext"
        subtext.innerHTML = "Bid: <br> Target:";

        prices.id = "price" + String(this.numRects);
        prices.className = "price";

        // Attach Events
        delButton.addEventListener("click", function(event){

            if (confirm("Remove this item?")) {

                self.app.Controller.UCDeleteRow("row"+ strNum);
        
            } else {
                // Do nothing!
            }

        })

        // Construct 'left' object
        prices.appendChild(biddiv);
        prices.appendChild(targetdiv);
        left.appendChild(delButton);
        left.appendChild(subtext);
        left.appendChild(prices);

        return left;

    }

    // Build the right row element
    makeRight(self){
        
        //console.log("Is loaded data null?" + loadedData.length);

        // Initialize DOM objects
        var strNum = String(this.numRects);
        var right = document.createElement('div');
        var dropdown = document.createElement('div');
        var button = document.createElement('button');
        var myDrop = document.createElement('div');

        // Set tags and text content
        right.className = "right.container";
        dropdown.id = "dropdown" + strNum;
        dropdown.className = "dropdown";
        button.className = "dropbtn";
        button.id = "dropBtn" + strNum;
        myDrop.id = "myDropdown" + strNum ;
        myDrop.className = "dropdown-content";
        button.innerHTML = "Make Selection";



         // Attach events
        button.addEventListener('click', function(event){
            document.getElementById("myDropdown" + strNum).classList.toggle("show");
        })

        // Construct 'right' object
        right.appendChild(dropdown);
        dropdown.appendChild(button);
        dropdown.appendChild(myDrop);

        return right;
    }

    // Build the middle row element
    makeMiddle(self){
   
        // Initialize DOM objects
        var strNum = String(this.numRects)
        var middle = document.createElement('div');
        var hw1 = document.createElement('div');
        var hw2 = document.createElement('div');
        var input = document.createElement('input');
        var button = document.createElement('button');

        var priceID = "biddiv" + strNum;
        var targetID =  "targetdiv" + strNum;

         // Set tags and text content
        button.innerHTML = "Activate"
        middle.className = "middle-container";
        hw1.className = "halfWidth";
        hw2.className = "halfWidth";
        input.type = "text";
        input.id = "targetInField" + strNum;
        input.value = "00.00";
        input.className = "targetInField";
        button.id = "setTargetButton" + strNum;
        button.className = "setTargetButton";
        input.className = "targetInField";

        var thisElement = this;

        // Attach events
        button.addEventListener("click",function(event){

            //var rows = document.getElementsByClassName("row");
            // If Inactive
            //if(pairList[0].fetchActive(document.getElementById("dropBtn" + strNum).innerHTML, pairList) ==false){
            console.log("Setting Target Value" + input.value);
            pairList[0].setTarget(input.value, document.getElementById("dropBtn" + strNum).innerHTML);
            pairList[0].toggleActive(input.id, button.id, document.getElementById("dropBtn" + strNum).innerHTML);

            // Update Bid and Target
            // updateBidTarget(priceID, targetID);
            thisElement.updateBid(priceID, "dropBtn" + strNum);
            thisElement.updateTarget(targetID, input.id);

        })

        input.addEventListener("click",function(event){

            this.select();
        })

        // Assemble 'middle' object
        middle.appendChild(hw1);
        middle.appendChild(hw2);
        hw1.appendChild(input);
        hw2.appendChild(button);

        return middle;

    }

    // Construct a dropdown list for the new item
    makeList(subID, id, buttonID){

        for(var i = 0; i < pairList.length; i++){

            // Create a link object (serves as a button)
            var a = document.createElement('a');
            a.className = "dropdown-content";
            a.innerHTML = pairList[i].name;
    
            // Determine the action that takes place on clicking a pair selection
            a.addEventListener('click', function(event){
    
                // Update Text Fields
                document.getElementById(buttonID).innerHTML = this.innerHTML;
                //document.getElementById(subID).innerHTML = '$' + pairList["unit"].fetchBid(String(this.innerHTML), pairList);

                // Close dropdown menu 
                this.parentElement.classList.toggle("show");
            })
    
            // Insert the list object into the DOM
            document.getElementById(id).appendChild(a);
        }
    }


    // Update bid price field
    updateBid(bidID, dropBtnID){

        console.log("Updating Bid")
        var buttonid = dropBtnID;

        console.log("Drop button inner: " + document.getElementById(buttonid).innerHTML);
        document.getElementById(bidID).innerHTML = pairList["unit"].fetchBid(document.getElementById(buttonid).innerHTML,pairList);

    }

    // Update target price field
    updateTarget(targetID, inputID){


        console.log(document.getElementById(inputID).id)
        console.log("Updating Target " +  document.getElementById(inputID).value)
        document.getElementById(targetID).innerHTML = document.getElementById(inputID).value;

    }

    // Remove GUI row object
    deleteRow(rowid){

        var rowElement = document.getElementById(rowid);
        rowElement.parentNode.removeChild(rowElement);
        this.limit--;

        console.log(this.limit);

        this.ok = true;
    
    
    }

    // Checks new prices against text fields, updates & notifies
    refreshView(){

        var currentElement;
        var bid;
        var target;             // Target Element
        var button;             // Activate Button
        var symbol;             // Currency pair symbol
        var input;
        var bidPrice;
        var targetPrice;
        var setTargButton;
        var dropbutton;
        var pricebutton;

        // Array of Row element to be parsed
        var rows = document.getElementsByClassName("row");  


        console.log("Refreshing View");

        // Parse Row Elements and update the View
        for(var i = 0; i < rows.length; i++){

            currentElement = rows[i];
            bid = currentElement.getElementsByClassName("biddiv");
            button = currentElement.getElementsByClassName("dropbtn");
            target = currentElement.getElementsByClassName("targetdiv");
            setTargButton = currentElement.getElementsByClassName("setTargetButton");
            dropbutton = currentElement.getElementsByClassName("dropbtn");
            pricebutton = currentElement.getElementsByClassName("price");
            input = currentElement.getElementsByClassName("targetInField");
            symbol = button[0].innerHTML;
            
            // Use first item in pairList to call the Pair class functions
            // Use the unit object for fetching
            bidPrice  = parseFloat(pairList["unit"].fetchBid(symbol, pairList));
            targetPrice = parseFloat(pairList["unit"].fetchTarget(symbol, pairList));

            // Update big and target price in GUI
            bid[0].innerHTML = '$' + bidPrice.toFixed(4);
            target[0].innerHTML = '$' + targetPrice.toFixed(4);

            console.log("Symbol: " + symbol + ", Bid: " + bidPrice + " | Target: " + targetPrice);

            // In essence, these 8-10 lines of code are the Notification Module
            // Not enough here that requires a separate module, notification only
            // happens in one way during the update sequence

            // Check if a notification should be sent
            if(bidPrice >= targetPrice){
                // Notify
                if(pairList["unit"].fetchActive(symbol,pairList)){
                    // Notify
                    alert("Target Met + " + targetPrice + "\n" + symbol + " Bid: " + bidPrice);

                    // Disable active notifications
                    pairList["unit"].toggleActive(input[0].id, setTargButton[0].id, symbol, dropbutton.id,pricebutton.id );
                }     
            }
        }
    }

    assignEvents(guiObject){

        console.log(" (4.4) Assigning Event Listeners ...");

        console.log("GUI Manager App Reference: " + guiObject.app.id);
        console.log("GUI Manager Controller Reference: " + guiObject.app.Controller.id);


        console.log("Assigning Events");
        // Save List Data
        document.getElementById("saveBtn").addEventListener('click', function(event){
            guiObject.app.Controller.UCSave(textPath);
            
        })

        // Make a new list item
        document.getElementById("addNewBtn").addEventListener('click', function(event){
        
            console.log("Making new item, application: " + guiObject.app.id);
            guiObject.app.Controller.UCMakeBox();
        })

        // Toggle http requests ON/ OFF
        document.getElementById("onoffBtn").addEventListener('click', function(event){

            guiObject.app.Controller.UCToggleFetchRequests();
        })
            
        // Clear List event listener
        document.getElementById("clearBtn").addEventListener('click', function(event){

            var rowElements = document.getElementsByClassName("row");
            if (confirm("Delete all " + rowElements.length + " list elements ?")) {

                while(rowElements.length > 0){
                    guiObject.app.Controller.UCDeleteRow(rowElements[0].id);
                }

            } 
            else {
                // Do nothing!
            }
        })      
    }

    getRowContent(filePath,callback){


        const rowWrap = document.getElementById("rowWrapper");
        const children = rowWrap.getElementsByClassName("row");

        console.log("# of Childrem: " + children.length);

        var saveString2 = "";

        // Save the important information from the GUI
        for(var i = 0; i < children.length; i++){

            saveString2 = saveString2 + children[i].getElementsByClassName("dropbtn")[0].innerHTML + "," + 
                            String(children[i].getElementsByClassName("targetInField")[0].value) + "," + 
                            String(children[i].getElementsByClassName("biddiv")[0].innerHTML) + "," + 
                            children[i].getElementsByClassName("targetdiv")[0].innerHTML;

            if(i < children.length - 1){
                saveString2 += "\n";
            }
        }

        callback(filePath, saveString2, this.app.Model.fileManager.fs)
    }
}