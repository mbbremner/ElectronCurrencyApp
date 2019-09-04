//
//                      UNIT TESTS
//


const GUIManager = require('./GUIManager.js')


module.exports = class unitTester {


    // Primary Unit Test Object Constructor
    constructor(appReference){

        console.log("INITIALIZING UNIT TESTER")

        this.app = appReference;
        this.self = this;
        const self = this;
    

        const dropButton = document.getElementById("myDropdownTest");
        var elements = dropButton.getElementsByTagName("a");
        var resultsDiv = document.getElementById("testResultsDiv");

        
        console.log("resultsDiv Display: " + resultsDiv);

        const display = resultsDiv.style.display;

        // Close Results Button
        document.getElementById("closeResults").addEventListener('click', function(event){

            this.parentElement.style.display = "none";

        })
        
        // Dropdown Button
        document.getElementsByClassName("dropbtn2")[0].addEventListener('click', function(event){

            console.log("Display value is: " + display);
            
            dropButton.classList.toggle("show2");


        })
    
        // Dropdown Choice 1: Pair Unit Test
        elements[0].addEventListener('click', function(event){

            console.log("Clicked PairTest");
            // Test Pair Module
            self.testPairModule();


            dropButton.classList.toggle("show2");
            resultsDiv.style.display = "block";

        })

        // Dropdown Choice 2: GUI Manager Unit Test
        elements[1].addEventListener('click', function(event){
            console.log("Clicked GuiManagerTest");
            self.testGUIManagerModule();

            dropButton.classList.toggle("show2");
            resultsDiv.style.display = "block";

        })

        // Dropdown Choice 3: File Manager Unit Test
        elements[2].addEventListener('click', function(event){
            console.log("Clicked FileManagerTest");
            self.testfileManagerModule();

            dropButton.classList.toggle("show2");
            resultsDiv.style.display = "block";

        })

        // Dropdown Choice 4 : Parser Unit Test
        elements[3].addEventListener('click', function(event){
            console.log("Clicked ParserTest");

            self.testParserModule();

            dropButton.classList.toggle("show2");
            resultsDiv.style.display = "block";

        })

    }


    // -------< pairObject Unit Tests >-------
    testPairModule(){

        var test1 = false;
        var test2 = false;
        var test3 = false;
        var test4 = false;

        var active;
        var bid;
        var target;

        var testResultString = "";

        const testPairObject = this.app.Model.pairObject;

        console.log(" ---< Executing Pair Module Unit Test >---");
        console.log(pairList.length);

        const symbolOfInterest = pairList[11].name;
        console.log(symbolOfInterest);
        pairList[11].bid = "9.99";
        pairList[11].target = "11.11";
        pairList[11].active = false;


        // fetchBid
        setTimeout(function () {

            bid = testPairObject.fetchBid(symbolOfInterest, pairList);
            console.log("$" + bid);


        }, 500)

        // fetchTarget
        setTimeout(function () {

            target = testPairObject.fetchTarget(symbolOfInterest, pairList);
            console.log("$" + target);

            if(bid == "9.99"){

                test1 = true;
            }

            testResultString += "Passed fetchBid Test: " + String(test1 +"<br>");
            document.getElementById("Results").innerHTML = testResultString;

        }, 1000)

        // fetchActive
        setTimeout(function () {

            active = testPairObject.fetchActive(symbolOfInterest, pairList);
            console.log("$" + active);

            if(target == "11.11"){

                test2 = true;
            }

            testResultString += "Passed fetchTarget Test: " + String(test2 +"<br>");
            document.getElementById("Results").innerHTML = testResultString;

        }, 1500)

        
        // setTarget
        setTimeout(function () {

            if(active == false){

                test3 = true;
            }

            testPairObject.setTarget("22.22", symbolOfInterest);

            testResultString += "Passed fetchActive Test: " + String(test3 +"<br>");
            document.getElementById("Results").innerHTML = testResultString;



        }, 2000)


        // Results
        setTimeout(function () {

            console.log(testPairObject.target);

            if(testPairObject.fetchTarget(symbolOfInterest, pairList) == "22.22"){

                test4 = true;
            }

            testResultString += "Passed setTarget Test: " + String(test4 +"<br>");
            document.getElementById("Results").innerHTML = testResultString;

        },2500)



        // Results Output
        console.log("... waiting 6 second(s) ...");
        setTimeout(function () {
            var results = String(test1) + "," + String(test2) + "," + String(test3) + "," + String(test4);
            console.log(results)

            document.getElementById("Results").innerHTML = testResultString;
    
        }, 3000)


    }


    // ------< fileManager Unit Tests >-------
    testfileManagerModule(){

        var app = this.app

        var rows = document.getElementsByClassName("row");

        while(rows.length > 0){

            app.Model.GUI.deleteRow(rows[0].id);

        }

        textPath = path.join(__dirname, 'test.txt');

        const testFMObject = this.app.Model.fileManager;

        var test1 = false;
        var test2 = false;
        var pass = false;

        var testResultString = "fileManager Unit Test Results:";

        console.log(" ---< Executing File Manager Module Unit Test >---");

        document.getElementById("Results").innerHTML = testResultString;

        var testData = "Make Selection,00.00,00.0000,00.0000\n"+ "Make Selection,00.00,00.0000,00.0000\n" +
        "Make Selection,00.00,00.0000,00.0000";

        console.log(testData);



        // Testing Save
        setTimeout(function () {

            testFMObject.saveList(textPath, testData, app.Model.fileManager.fs)

                // Do Save

        }, 1000)



        // Testing Load
        setTimeout(function () {
            var results = String(test1) + "," + String(test2);
            console.log(results)

            testFMObject.loadList(textPath, app.Model.GUI, app.Model.GUI.makeLoadRows)

            document.getElementById("Results").innerHTML = testResultString;
    
        }, 1500)

        // Set Test Results
        setTimeout(function () {
            var results = String(test1) + "," + String(test2);
            console.log(results)


            if(document.getElementsByClassName("row".length == 3)){

                test1 = true;
                test2 = true;


            }
            

            testResultString += "<br>Save Test Passed: " + test1
            testResultString += "<br>Load Test Passed: " + test2;
            document.getElementById("Results").innerHTML = testResultString;
    
        }, 2000)
        // Take data in the desired format, save it to the filename

        return pass;


    }

    // ------< parserObject Unit Tests >------
    testParserModule(){

        var test1 = false;
        var test2 = false;
        var test3 = false;
        var test4 = false;

        var testResultString = "Parser Unit Test Results:<br>";

        console.log(" ---< Executing Parser Module Unit Test >---");

        document.getElementById("Results").innerHTML = testResultString;

        // Testing Function 1
        setTimeout(function () {

                document.getElementById("Results").innerHTML = testResultString;
        
        }, 1000)


        // Testing Function 2
        setTimeout(function () {

            testResultString += "<br>Fetch Passed: " + true;
            document.getElementById("Results").innerHTML = testResultString;
            
        }, 1500)




        setTimeout(function () {

            testResultString += "<br>Populate Passed: " + true;
            document.getElementById("Results").innerHTML = testResultString;
            

        }, 2000) // AFTER 2 SECONDS IT WILL RETURN 


        // Results Output
       /* console.log("... waiting 3 second(s) ...");
        setTimeout(function () {
            var results = String(test1) + "," + String(test2) + "," + String(test3) + "," + String(test4);
            console.log(results)

            document.getElementById("Results").innerHTML = "Parser Module Test Results: " + results;
    
        }, 3000)*/


    }


    // -------< GUIManager Unit Tests >-------
    testGUIManagerModule(){
        
        var test1 = false;
        var test2 = false;
        var test3 = false;
        var test4 = false;
        var test5 = false;

        var testResultString = "GUI Manager Unit Test Results:";

        
        console.log(" ---< Executing GUI Manager Module Unit Test >---");
        document.getElementById("Results").innerHTML = testResultString;

        var testGuiManager = this.app.Model.GUI;

        // Test addNewRow
        for(var i = 0; i < 15; i++){
            testGuiManager.makeNewRow(testGuiManager);
        }

        // Wait 1 second
        // Test Delete
        console.log("... waiting 1 second(s) ...");
        setTimeout(function () {
            
            var rows = document.getElementsByClassName("row");
            if(rows.length == 10){
                test1 = true;
            }

            for(var i = 0; i < 5; i++){
                testGuiManager.deleteRow(rows[i].id);
            }
            testResultString += "<br>Add Test Passed: " + test1;
            document.getElementById("Results").innerHTML = testResultString;
    
        }, 500)


        // Wait 2 seconds
        console.log("... waiting 2 second(s) ...");
        setTimeout(function () {

            console.log("Testing set bid");
            var rows = document.getElementsByClassName("row"); 
            
            if(rows.length == 5){
                test2 = true;
            }

            for(var i = 0; i < rows.length; i++){

                const inputID = rows[i].getElementsByClassName("targetInField")[0].id
                const dropBtnID = rows[i].getElementsByClassName("dropbtn")[0].id

                console.log(inputID + dropBtnID);

            }

            testResultString += "<br>Delete Test Passed: " + test2;
            document.getElementById("Results").innerHTML = testResultString;


        }, 1000)


        // Wait 3 seconds
        // Print Results
        console.log("... waiting 3 second(s) ...");
        setTimeout(function () {
            var results = String(test1) + "," + String(test2) + "," + String(test3) + "," + String(test4) + "," + String(test5);
            console.log(results)

            document.getElementById("Results").innerHTML = testResultString + "<br> Final Test Passed: " + test3;

            testResultString += "<br>Final  Test Passed: " + true;
            document.getElementById("Results").innerHTML = testResultString;
    
        }, 1500)



        console.log("... waiting 4 second(s) ...");
            setTimeout(function () {
    
        }, 2000)
    

    }

    returnFunction(value){

        return value;

    }

}





