# norjs

A lightweight easy to use Javascript Library to build fast web applications

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

### Create HTML Objects

```javascript
// create a simple HTML Object
var myBigTitle = nor.createObject("h1", {textContent: "An awesome title"});
~~document.body.appendChild(myBigTitle);~~

// ...lets make it a little bit complex
var myContainer = nor.createObject("div", {id: "main-container", 
                                          class: "container flex", 
                                          'data-somedata':12,
                                          child: myBigTitle,
                                          parent: document.body
                                          }, "background-color:red;color:yellow");
                                          
var subTitle = nor.createObject("h2", {textContent: "A subtitle", parent: myContainer});   

nor.event(myContainer, ["scroll"], [someFunction]);

// this results in such a DOM =>

/*
* <div id="main-container" class="flex container" data-somedata="12" style="background-color:red;color:yellow">
*	   <h1>An awesome title</h1>
*	   <h2>A subtitle</h2>
* </div>
*/
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


