var nor = {
	Version: "0.0.1",
	init: function() {

	},

	event: function(elem, evt, func) {

		if (!Array.isArray(evt) || !Array.isArray(func) ) {
    		try {
    			throw new Error("Event and Function arguments must be arrays! e.g. nor.event('#test', ['click'], [clickFunction])");
    		} catch(e) {
    			console.log(e);
    		}
		}

		if (elem instanceof HTMLElement) {
			for (var i = evt.length - 1; i >= 0; i--) {
				elem.addEventListener(evt[i], func[i], false);
			}
			return elem;
		}
		
		if (elem instanceof HTMLCollection) {
			for (var i = elem.length - 1; i >= 0; i--) {
				for (let k = evt.length - 1; k >= 0; k--) {
					elem[i].addEventListener(evt[k], func[k], false);
				}
			}
			return elem;
		}

		if (elem.charAt(0) == "#") {
			elem = elem.slice(1);
			for (var i = evt.length - 1; i >= 0; i--) {
				document.getElementById(elem).addEventListener(evt[i], func[i], false);
			}
			return document.getElementById(elem);
		} else if (elem.charAt(0) == ".") {
			elem = elem.slice(1);
			let elements = document.getElementsByClassName(elem);
			for (let i = elements.length - 1; i >= 0; i--) {
				for (let k = evt.length - 1; k >= 0; k--) {
					elements[i].addEventListener(evt[k], func[k], false);
				}
				
			}
			return elements;
		}
	},

	request: function(url, callback, method = "GET", parameters) {
		let request = new XMLHttpRequest();
		request.onload = () => {if (request.status == 200) callback(request.responseText);}
		request.open(method, url, true);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		request.send(parameters);
	},

	// type : String 
	// config : Javascript Object 
	createObject: function(type, config = {}, styles = "") {
		let element = document.createElement(type);
		for (var property in config) {
		    if (config.hasOwnProperty(property)) {
		        element[property] = config[property];
		        if (property == "class") {
		        	const list = config[property].split(" ");
		        	for (var i = list.length - 1; i >= 0; i--) {   		
				       	element.classList.add(list[i]);
		        	}
		        }
		        if (property.substring(0,4) == "data") {
		        	element.setAttribute(property, config[property]);
		        }
		    }
		}

		if (styles != "") element.setAttribute("style", styles);

		return element;
	}

}