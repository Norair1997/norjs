
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

let div = nor.createObject("div", { "id": "asd", "className": "sdfgsdf", "innerHTML": "Hello World!" });

nor.event(div, ["click"], [clickFunction]);
document.body.appendChild(div);


nor.event("#test", ["click"], [clickFunction]);

nor.event(document.body, ["click"], [clickFunction]);