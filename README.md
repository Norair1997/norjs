# norjs

A lightweight easy to use Javascript Library to build fast web applications

## How to 'install' it? Its super simple

```HTML
  <script src="nor.js"></script>
```

## Events
```javascript

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
}]);

```

## Create HTML Objects

```javascript
// create a simple HTML Object
var myBigTitle = nor.createObject("h1", {textContent: "An awesome title"});
document.body.appendChild(myBigTitle);

// ...lets make it a little bit complex
var myContainer = nor.createObject("div", {id: "main-container", 
                                          class: "container flex", 
                                          'data-somedata':12
                                          }, "background-color:red;color:yellow");
                                          
nor.event(myContainer, ["scroll"], [someFunction]);
document.body.appendChild(myContainer);
```

## Ajax Calls (httpRequest)

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


