var localisationCache = null;
var language = null;

function getLocalisation(lang) {
	if (localisationCache == null) {
		return fetch("localisation/" + lang + ".json")
			.then(response => response.json())
			.then(data => localisationCache = data);
	} else {
		return localisationCache;
	}
}

async function writePhrase(phraseid) {
	var pidParts = phraseid.split(".");
	var localisationVal = await getLocalisation(language);
	while (pidParts.length) {
		localisationVal = localisationVal[pidParts.shift()];
	}
	document.currentScript.insertAdjacentHTML("beforebegin", localisationVal);
}

if (document.cookie.split(";").some(item => item.trim().startsWith("lang="))) {
	language = document.cookie.split(";").find(item => item.trim().startsWith("lang=")).substring(5);
} else {
	language = "en";
}
getLocalisation(language);
