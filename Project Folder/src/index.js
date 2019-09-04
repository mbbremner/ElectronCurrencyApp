/*===================================================================*/
/*-----------------------------  INDEX ------------------------------
/*----------------------------  Group 10  ---------------------------
/*===================================================================*/

// Imports objects
const electron = require('electron')
const path = require('path')
const pairObject = require('./pairObject.js')
const MyApplication = require('./MyApplication.js')


var pairList = [];
pairList["unit"] = new pairObject("unit");
textPath = path.join(__dirname, 'input.txt');

//  --------------------------------------------------
//  ---------- < Initialize Application > ------------
//  --------------------------------------------------

const CurrencyTracker = new MyApplication();


// Begin Load Sequence
CurrencyTracker.Controller.UCLoadSequence(textPath);

