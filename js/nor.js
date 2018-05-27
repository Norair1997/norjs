var nor = {
	ver: "0.0.3",

	// selector[] : Array of Strings or CSS like Selector or HTMLElement or HTMLCollection
	// evt[] : Array of Strings ["click", "mouseenter", ...]
	// func[] : Array of functions [function1, function(){}, function2]
	event: function(selector, evt, func) {
		if (!Array.isArray(evt) || !Array.isArray(func) || !Array.isArray(selector) ) {
    		try {
    			throw new Error("Selector, Event and Function arguments must be arrays");
    		} catch(e) {
    			console.log(e);
    		}
		}
		var returnElements = [];
		var len = selector.length - 1;
		for (var e = 0; e <= len; e++) {
			var elem = selector[e];
			if (elem instanceof HTMLElement || elem instanceof HTMLDocument) {
				for (var i = evt.length - 1; i >= 0; i--) {
					elem.addEventListener(evt[i], func[i], false);
				}
				returnElements.push(elem);
			} else if (elem instanceof HTMLCollection) {
				for (var i = elem.length - 1; i >= 0; i--) {
					for (var k = evt.length - 1; k >= 0; k--) {
						elem[i].addEventListener(evt[k], func[k], false);
					}
				}
				returnElements.push(elem);
			} else if (elem.charAt(0) == "#") {
				elem = elem.slice(1);
				elem = document.getElementById(elem);
				for (var i = evt.length - 1; i >= 0; i--) {
					elem.addEventListener(evt[i], func[i], false);
				}
				returnElements.push(elem);
			} else if (elem.charAt(0) == ".") {
				elem = elem.slice(1);
				var elements = document.getElementsByClassName(elem);
				for (var i = elements.length - 1; i >= 0; i--) {
					for (var k = evt.length - 1; k >= 0; k--) {
						elements[i].addEventListener(evt[k], func[k], false);
					}
				}
				returnElements.push(elements);
			}
		}
		return returnElements;
	},

	request: function(url, callback, method = "GET", parameters) {
		var request = new XMLHttpRequest();
		request.onload = () => {if (request.status == 200) callback(request.responseText);}
		request.open(method, url, true);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		request.send(parameters);
	},

	// type : String 
	// config : Javascript Object
	createObject: function(type, config = {}) {
		var element = document.createElement(type);
		for (var property in config) {
		    if (config.hasOwnProperty(property)) {
		        if (property.substring(0,4) == "data") {
		        	element.setAttribute(property, config[property]);
		        } else if (property == "parent"){
		        	config[property].appendChild(element);
		       	} else if (property == "child"){
		        	element.appendChild(config[property]);
		       	} else {
		       		element[property] = config[property];
		        }
		    }
		}

		return element;
	}
}