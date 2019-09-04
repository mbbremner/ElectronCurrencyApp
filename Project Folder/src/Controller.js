/*===================================================================*/
/*---------------------- -MODULE: Controller -------------------------
/*===================================================================*/


module.exports = class Controller {

    // Controller Object
    // Responsible for executing Application Use Cases
    constructor(appReference){
        console.log("(2) Initializing Controller");
        this.app = appReference;
        this.id = "- Application Controller -";
        console.log("Controller App Reference: " + this.app.id);
    }

    // APPLICATION LOAD SEQUENCE
    UCLoadSequence(filePath){
        console.log("(4) Application Load Sequence initialized");
        console.log("App Model: " + this.app.id);
        this.app.Model.Parser.update = true
        this.UCLoad(filePath);
        this.app.Model.Parser.getRateXML(this.app.Model.GUI, this.app.Model.Parser.popPairList, this.app.Model.Parser.InitializeFetchSequence);
    } 

    // Use case for when user clicks "Add new"
    UCMakeBox(){

        console.log("Model Limit: " + this.app.Model.GUI.limit);

        console.log("App Model: " + this.app.id);
        //pList = this.modelObject.Parser.pairList;
        if(this.app.Model.GUI.ok){
            this.app.Model.GUI.makeNewRow(this.app.Model.GUI);

            if(this.app.Model.GUI.limit == 11){

                this.app.Model.GUI.ok = false;
            }
        }
        else{
            alert("List Limit Reached: 10 Items");
        }
    }

    // Use case for when user clicks delete or clear button
    UCDeleteRow(rowid){
        this.app.Model.GUI.deleteRow(rowid);
    }

    // Use case for saving list
    UCSave(filePath){
        // Saved HTML objects
        this.app.Model.GUI.getRowContent(filePath,this.app.Model.fileManager.saveList);
    } 

    // Use case for loading stored list
    UCLoad(filePath){

        console.log("(4.1) Building Saved Rows");

        this.app.Model.fileManager.loadList(filePath,this.app.Model.GUI.self, this.app.Model.GUI.makeLoadRows);
    }

    // Use Case for when User wishes to toggle http fetching on/off
    UCToggleFetchRequests(){

        console.log("Toggling Fetch Requests, Update = " + this.app.Model.Parser.update);

        var toggleButton = document.getElementById("onoffBtn");

        if(this.app.Model.Parser.update == false){

            console.log("Toggling to: true");
            this.app.Model.Parser.update = true;
            toggleButton.style.backgroundColor = "rgba(116, 223, 130, 0.774)";
            toggleButton.innerHTML = "On";

        }
        else{
            console.log("Toggling to: false");
            this.app.Model.Parser.update = false;
            toggleButton.style.backgroundColor = "rgb(199, 107, 107)";
            toggleButton.innerHTML = "Off";

        }

        console.log("Update On: " + this.app.Model.Parser.update);

    }

}