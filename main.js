var language = localStorage.getItem('lang') || 'en'

window.addEventListener('localisationLoad', _ => {
  for (const node of document.querySelectorAll('[pid]')) {
    var pidParts = node.getAttribute('pid').split('.')
    var localisationVal = localisationCache
    while (pidParts.length) {
      localisationVal = localisationVal[pidParts.shift()]
    }
    node.innerText = localisationVal
  }
})

window.addEventListener('DOMContentLoaded', async _ => {
  await getCache(`localisation/${language}.json`, 'localisation', 'localisationCache')
  await getCache('spectrums.json', 'spectrums', 'spectrumCache')
  await getCache('prompts.json', 'prompts', 'promptCache')
  await getCache('config.json', 'config', 'configCache')

  document.title = localisationCache.title

  const fragment = new DocumentFragment()
  const list = document.createElement('ul')

  for (const lang of configCache.languages) {
    const listitem = document.createElement('li')
    const btn = document.createElement('a')
    btn.setAttribute('class', 'linkbutton')
    btn.onclick = async _ => {
      localStorage.setItem('lang', lang.lid)
      await cacheFile(`localisation/${lang.lid}.json`, 'localisation', 'localisationCache')
      location.reload()
    }
    btn.innerText = lang.name
    listitem.appendChild(btn)
    list.appendChild(listitem)
  }

  fragment.appendChild(list)
  document.getElementsByTagName('nav')[0].appendChild(fragment)
})

function getCache (location, storageKey, variableName) {
  window[variableName] = JSON.parse(sessionStorage.getItem(storageKey))

  if (window[variableName]) return window.dispatchEvent(new Event(`${storageKey}Load`))

  cacheFile(location, storageKey, variableName)
}

async function cacheFile (location, storageKey, variableName) {
  const response = await fetch(location)
  const data = await response.json()

  sessionStorage.setItem(storageKey, JSON.stringify(data))
  window[variableName] = data
  window.dispatchEvent(new Event(`${storageKey}Load`))
}
