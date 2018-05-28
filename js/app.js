// adding a event to an element with an id
nor.on("#someId", "click", clickFunction);

// adding multiple functions with multiple triggers
nor.on(["#someId"], {mouseenter: someFunction, click: clickFunction});

// it works also with ".classes"
nor.on(".button", {mouseenter: someFunction, click: clickFunction});

// and HTML Elements
nor.on(document, "DOMContentLoaded", init);

// attach to multiple object the same events and triggers
nor.on([".button", "#myDiv"], {
  click: someFunction,
  mouseleave: mouseLeaveFunction
});

// or with a Collection of HTML Elements  (anonymous functions work too)
var myInputs = document.getElementsByTagName("input");
nor.on(myInputs, {
  focus: focusFunction,
  input: inputFunction,
  blur: function(e) { // do something when the input element loses focus
    console.log("focus loss");
  }
});

nor.request("http://localhost/fonts.txt", {
  method: "GET",
  onSuccess: (request) => {console.log("Successful",request.responseText)},
  onError: (request) => {console.log("Error",request.responseText)},
  data: "userName=helloworld"
})





function clickFunction() {
    console.log("click function triggerd");
}

function mouseLeaveFunction() {
    console.log("mouseleave function triggerd");
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

var myBigTitle = nor.createObject("h1", "An awesome title");


var myContainer = nor.createObject("div", {
  id: "main-container",
  className: "container flex",
  'data-somedata':12,
  parent: document.body,
  style: "background-color:red;color:yellow",
  once: {
    click: function () {
      console.log('one time click');
    }
  }
},
  myBigTitle
);

var subTitle = nor.createObject("h2", {parent: myContainer}, "A subtitle");

// this results in such a DOM =>

/*
* <div id="main-container" class="flex container" data-somedata="12" style="background-color:red;color:yellow">
*	<h1>An awesome title</h1>
*	<h2>A subtitle</h2>
* </div>
*/
