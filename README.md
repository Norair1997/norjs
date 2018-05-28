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
nor.on("#someId", "click", (event, element) => {
    /* do your thing */
});

// adding multiple functions with multiple triggers
nor.on("#someId", {mouseenter: someFunction, click: clickFunction});

// target multiple elements with a single event manager
nor.on([".side-bar", ".toggle-button"], {
  click (e, btn) {
    btn.classList.toggle("open");
  }
});

// handle an event once and once only
const newsComponent = document.querySelector('.news-component')

nor.once(newsComponent, 'dataLoaded', ({detail: {data}}, el) => {
  newsComponent.removeSkeleton()
  newsComponent.populate(data)
})

// emit a custom event after fetching some data using .request and .emit
nor.request('/news/latest/', data => {
  nor.emit(newsComponent, 'dataLoaded', {data: JSON.parse(data)})
})
```

The event function returns a manager/handler object.
```javascript
var manager = nor.event('#someId', 'click', e => {
  console.log('ya clicked me! What say you?')
});

manager.off() // stops listening to events
manager.on() // start listening again
manager.once() // listen once and then stop

// add another listener to the previous listener's target(s)
nor.once(manager.target, 'i-say', e => {
  console.log(`I say ${e.detail}`);
})

// emit a custom event on the target element
// straight from the event manager
// .emit(eventName: String, =detail: Any)
manager.emit(
  'i-say',
  'event handling and emitting has never been this easy'
)

// do stuff with the event's target element
manager.target.style.color = 'red';

```

### Create HTML Objects

```javascript
// create a simple HTML Heading 1 Element
var myBigTitle = nor.createObject("h1", "An awesome title");

// ...lets make it a little bit complex
var myContainer = nor.createObject("div", {
  id: "main-container", // set the id
  className: "container flex", // give it some classes
  'data-somedata': 12, // add a data attribute
  parent: document.body, // attach this element to the DOM via document.body
  style:  "background-color:red;color:yellow" // and some stylistic flair
  on: { // add some events
    scroll: smoothScrollingMagicFunction
  }
},
  myBigTitle // this is our title we created before
);
```

Now you may want to dynamically add more child nodes created asynchronously
```javascript
setTimeout(() => { // no problem at all
  nor.createObject("h2", {parent: myContainer}, "A subtitle");
});
```

And Voila! In the ``<body>`` you should now see
```html
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

#### nor.event/on/once(target String|EventTarget|Array, type String|Object, =handle Function, =options Object|Boolean);
```javascript
nor.event(document, 'DOMContentLoaded', e => {/* do something on load */})

const manager = nor.on('.cards', {
  animationEnd (event, element) {
    element.classList.remove('shuffle-effect')
  }
})

manager.target // <- EventTarget|NodeList|EventTargets[]

if (catastrophyOccurs) {
  manager.off();
  Array.from(manager.target).forEach(card => {
    card.remove();
  })
}

if (miracleHappens) {
  const deck = document.querySelector('.deck')
  deck.append(...manager.target)
  manager.on(); // listen again
}
```
#### nor.createObject(tag String, =config Object, ...children String|Node|Array|Function);
```javascript
var myTitle = nor.createObject("h1", {
  className: "foo bar",
  style: "color:#4a4; font-size:18px",
  parent: document.body // NOTE: attribute order doesn't matter
},
  "An awesome title"
);
```
#### nor.request(url String, callback Function, =method String, =params Any);
```javascript
  // NOTE: The default method is "GET"
  nor.request('https://imgur.com/random', handleImageDataAndAppendImageToDom);
```

_____________________________________________

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
