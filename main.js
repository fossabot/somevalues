const DEFAULTLANGUAGE = "en";
const HOSTNAME = "https://deekts.github.io/political-hexedekeract/";

var language = DEFAULTLANGUAGE;
var localisationCache;

function getLocalisation(lang) {
	if (localisationCache == null) {
		return fetch("localisation/" + lang + ".json")
			.then(response => response.json())
			.then(data => localisationCache = data);
	} else {
		return localisationCache;
	}
}

async function getPhrase(phraseid) {
	var pidParts = phraseid.split(".");
	var localisationVal = await getLocalisation(language);
	while (pidParts.length) {
		localisationVal = localisationVal[pidParts.shift()];
	}
	return localisationVal;
}

if (document.cookie.split(";").some(item => item.trim().startsWith("lang="))) {
	language = document.cookie.split(";").find(item => item.trim().startsWith("lang=")).substring(5);
}
getLocalisation(language);

document.addEventListener('DOMContentLoaded', async _ => {
	for (let node of document.querySelectorAll("[pid]")) {
		node.innerHTML = await getPhrase(node.getAttribute("pid"));
	}
});
