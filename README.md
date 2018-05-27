# norjs

A lightweight (~1.3KB) easy to use Javascript Library to build fast web applications

Support: (IE 10+, Firefox 3.6+, Chrome 8+, Safari 5.1+, Opera 12.1+) 

## How to install

Just bind it in the 'head' or generally before you wanna use it
```HTML
<head>
  ...
  <script src="nor.js"></script>
</head>
```

## How to use it
### Events
```javascript

// adding a event to an element with an id
nor.event(["#someId"], ["click"], [clickFunction]);

// adding multiple functions with multiple triggers
nor.event(["#someId"], ["mouseenter", "click"], [someFunction, clickFunction]);

// it works also with ".classes"
nor.event([".button"], ["mouseenter", "click"], [someFunction, clickFunction]);

// and HTML Elements
nor.event([document], ["DOMContentLoaded"], [init]);

// attach to multiple object the same events and triggers
nor.event([".button", "#myDiv"], ["click", "mouseleave"], [someFunction, mouseLeaveFunction]);

// or with a Collection of HTML Elements  (anonymous functions work too)
var myInputs = document.getElementsByTagName("input");
nor.event([myInputs], ["focus", "input", "blur"], [focusFunction, inputFunction, function(e) {
    // do something when the input element loses focus
    console.log("focus loss");
}]);



```

The event function returns the object it attaches events to.
```javascript
var myDiv = nor.event("#someId", ["click"], [clickFunction]);
myDiv.style.color = "red";
// do stuff with myDiv


var myButtons = nor.event(".button", ["click"], [clickFunction]);
// myButtons[] <- Collection of the objects
```

### Create HTML Objects

```javascript
// create a simple HTML Object
var myBigTitle = nor.createObject("h1", {textContent: "An awesome title"});

// ...lets make it a little bit complex
var myContainer = nor.createObject("div", {id: "main-container", 
                                          class: "container flex", 
                                          'data-somedata':12,
                                          child: myBigTitle, // this is our title we created before
                                          parent: document.body
                                          }, "background-color:red;color:yellow");
                                          
var subTitle = nor.createObject("h2", {textContent: "A subtitle", parent: myContainer});   

nor.event(myContainer, ["scroll"], [someFunction]);

// this results in such a DOM =>
```
```HTML
<div id="main-container" class="flex container" data-somedata="12" style="background-color:red;color:yellow">
  <h1>An awesome title</h1>
  <h2>A subtitle</h2>
</div>
```

### Ajax Calls (httpRequest)

```javascript

// make a GET call and see what it returns 
nor.request("http://localhost/somephpFileorSomethingElse.txt", success, "GET");
function success(result) {
  console.log(result); // <- result = (request.responseText)
}

// you can send parameters too
nor.request("http://localhost/getUserData.php", iGotTheUser, "POST", "userId="+userId);
function iGotTheUser(user) {
  // do something with user e.g.
  // var myUser = JSON.parse(user);
}
```

### Overview

## nor.event([], [], []);
```javascript
var arrayOfSelector = [".someclass", "#someId", document.body, document.links, ...];
var arrayOfTriggers = ["click", "scroll", "mouseenter", "keydown", ...];
var arrayOfFunctions = [someClickFunction1, function(){}, mouseEnterFunc, keyPressedFunc, ...];

var selectedElements = nor.event(arrayOfSelector, arrayOfTriggers, arrayOfFunctions);

// Extra feature: It returns the selected objects in an array
``` 
## nor.createObject("", {});
```javascript
var myTitle = nor.createObject("h1", {textContent: "An awesome title",
                                      className: "foo bar",
                                      style: "color:#4a4; font-size:18px",
                                      parent: document.body});
// the order of the attributes doesn't matter
``` 
## nor.request("", (), "", "");
```javascript
This will be changed in the near future
TODO
``` 


MIT License

Copyright (c) 2018 Norair Mikaelyan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
