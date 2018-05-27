// adding a event to an element with an id
nor.event("#someId", ["click"], [clickFunction]);

// adding multiple functions with multiple triggers
nor.event("#someId", ["mouseenter", "click"], [someFunction, clickFunction]);

// it works also with ".classes"
nor.event(".button", ["mouseenter", "click"], [someFunction, clickFunction]);

// and HTML Elements
nor.event(document, ["DOMContentLoaded"], [init]);

// or with a Collection of HTML Elements  (anonymous functions work too)
var myInputs = document.getElementsByTagName("input");
nor.event(myInputs, ["focus", "input", "blur"], [focusFunction, inputFunction, function(e) {
  // do something when the input element loses focus
  console.log("focus loss");
}]);

function clickFunction() {
	console.log("click function triggerd");
}


function someFunction() {
	console.log("somefunction triggered");
}

function init() {
	console.log("init triggered");
}

function focusFunction() {
	console.log("focusFunction triggered");
}


function inputFunction() {
	console.log("inputFunction triggered");
}