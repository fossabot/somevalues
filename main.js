var localisation = null;

function getLocalisation(lang) {
	fetch("localisation/" + lang + ".json")
		.then(response => response.json())
		.then(data =>  localisation = data);
}

function writePhrase(phraseid) {
	document.currentScript.insertAdjacentHTML("beforebegin", localisation[phraseid]);
}

if (document.cookie.split(";").some((item) => item.trim().startsWith("lang="))) {
	getLocalisation(document.cookie.split(";").find((item) => item.trim().startsWith("lang=")).substring(5));
}
