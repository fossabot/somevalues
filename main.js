var localisation = null;

function getLocalisation(lang) {
	let req = new XMLHttpRequest();
	req.open("GET", "/localisation/" + lang + ".json");
	req.responseType = "json";
	req.send();
	req.onload = function () {
		localisation = req.response;
	}
}