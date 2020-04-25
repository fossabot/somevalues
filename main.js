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
});

cacheFile(`localisation/${language}.json`, 'localisation', 'localisationCache')
cacheFile('spectrums.json', 'spectrums', 'spectrumCache')
cacheFile('prompts.json', 'prompts', 'promptCache')
cacheFile('config.json', 'config', 'configCache')

function cacheFile(location, storageKey, variableName) {
	window[variableName] = JSON.parse(sessionStorage.getItem(storageKey))
	if (!window[variableName]) {
		fetch(location)
			.then(response => response.json())
			.then(data => {
				sessionStorage.setItem(storageKey, JSON.stringify(data))
				window[variableName] = data
			});
	}
	window.dispatchEvent(new Event(`${storageKey}Load`))
}

