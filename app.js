
nor.event("#test", ["click"], [clickFunction]);
nor.event(".button", ["click", "mouseenter"], [clickFunction, mouseenterFunction]);
nor.event("#send-btn", ["click"], [sendFunction]);

function clickFunction(e) {
	console.log("clicked");
}

function mouseenterFunction() {
	console.log("mouseentered");
}

function sendFunction() {
	nor.request("http://localhost/idee1.txt", success, "POST");
	function success(result) {
		console.log(result);
	}
}

let div = nor.createObject("div", {id: "asd", class: "btn-class another", textContent: "Hello World!", "data-something": "45"}, "background-color: red; color: blue");

nor.event(div, ["click"], [clickFunction]);
document.body.appendChild(div);


nor.event("#test", ["click"], [clickFunction]);

let myTitle = nor.event(nor.createObject("h1", {textContent: div.textContent}), ["click"], [clickFunction]);

nor.event(document.links, ["click"], [clickFunction]);

document.body.appendChild(myTitle);

//nor.event(document.body, ["click"], [clickFunction]);