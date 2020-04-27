var language = localStorage.getItem('lang') || 'en';

window.addEventListener('localisationLoad', _ => {
	for (let node of document.querySelectorAll("[pid]")) {
		var pidParts = node.getAttribute("pid").split('.');
		var localisationVal = localisationCache;
		while (pidParts.length) {
			localisationVal = localisationVal[pidParts.shift()];
		}
		node.innerHTML = localisationVal;
	}
})

window.addEventListener('DOMContentLoaded', _ => {
	getCache(`localisation/${language}.json`, 'localisation', 'localisationCache')
	getCache('spectrums.json', 'spectrums', 'spectrumCache')
	getCache('prompts.json', 'prompts', 'promptCache')
	getCache('config.json', 'config', 'configCache')
})

function getCache(location, storageKey, variableName) {
	window[variableName] = JSON.parse(sessionStorage.getItem(storageKey))

	if (window[variableName]) return window.dispatchEvent(new Event(`${storageKey}Load`))

	cacheFile(location, storageKey, variableName)
}

async function cacheFile(location, storageKey, variableName) {
	let response = await fetch(location)
	let data = await response.json()

	sessionStorage.setItem(storageKey, JSON.stringify(data))
	window[variableName] = data
	window.dispatchEvent(new Event(`${storageKey}Load`))
}

