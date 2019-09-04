/*===================================================================*/
/*---------------------- MODULE: fileManager  -----------------------
/*===================================================================*/



module.exports = class fileManager {

    constructor(fs, appReference){

        console.log("(3.3) Initializing File Manager");
        this.fs = fs;
        this.app = appReference;
        this.delBtnClass = "delbutton";
        this.bidElementClass = "biddiv";
        this.targetElementClass = "targetdiv";
        this.inputClass = "targetInField";
        this.activateClass = "setTargetButton";
        this.dropBtnClass = "dropbtn";

        console.log("File Manager App Reference: " + this.app.id);
    }

    saveList(filePath, saveString, fs){

        const rowWrap = document.getElementById("rowWrapper");
        const children = rowWrap.getElementsByClassName("row");

        console.log("# of Childrem: " + children.length);


        // Write To File
        fs.writeFile(filePath, saveString, function (err, data) {
            if (err) {
            return console.error(err);
            }
            console.log("File Write Complete");
        });
    }

    loadList(filePath, guiRef, callback){

        console.log("Load List");

        this.fs.readFile(filePath, function (err, data) {
            if (err) {
              return console.error(err);
            }
            else{
                console.log("File Read Complete: " + data.toString());
                //GUI.makeLoadedRows(data.toString());
                callback(data.toString(), guiRef);

            }
        });

    }
}