/* eslint-env browser */
'use strict'

const CryptoJS = require('crypto-js')

let kDefaults = {
	hashAlgorithm: 'sha512',
	hashEncoding: 'hex'
}

require('../node_modules/bootstrap/dist/js/bootstrap.min.js')
require('../node_modules/bootstrap/dist/css/bootstrap.min.css')
require('./ga.js')
require('./style.css')

let title = document.createElement('h1')
title.classList.add('title')
title.innerHTML = 'Flotorizer'
document.body.appendChild(title)

let title2 = document.createElement('h2')
title2.classList.add('title2')
title2.innerHTML = 'The Future of Document Notorization is here'
document.body.appendChild(title2)

let title3 = document.createElement('h3')
title3.classList.add('title3')
title3.innerHTML = ' Secure documents and notarize any file within the FLO blockchain.'
document.body.appendChild(title3)


let logoDiv = document.createElement('div') 
let logo = document.createElement('img')
logo.classList.add('logo')
logo.setAttribute('src', 'flo-logo.png')
logoDiv.appendChild(logo)
document.body.appendChild(logoDiv)


let fileFormLabel = document.createElement('label')
fileFormLabel.classList.add('btn', 'btn-primary')
fileFormLabel.id = 'fileFormLabel'
fileFormLabel.setAttribute('for', 'fileInput')

let fileForm = document.createElement('input')
fileForm.id = 'fileInput'
fileForm.type = 'file'
fileForm.style.display = 'none'
fileForm.addEventListener('change', function() {
	let fileInput = document.getElementById('fileInput'),
		newick = '',
		file = fileInput.files[0]
	console.log(file)
	let reader = new FileReader()

	reader.onloadend = function(event) {
		if (event.target.readyState === FileReader.DONE) {
			let wordArray = CryptoJS.lib.WordArray.create(event.target.result),
				thisHash = CryptoJS.SHA512(wordArray).toString()
					.toUpperCase(),
				getReq = 'f=' + file.name + '&' + 'hs=' + thisHash,
				url = '/flotorize?' + getReq
			let element = document.createElement('a')
			element.setAttribute('href', url)
			element.style.display = 'none'
			document.body.appendChild(element)
			element.click()
			document.body.removeChild(element)
			let hashString = document.createElement('p')
			hashString.classList.add('hashed')
			hashString.innerHTML = thisHash
			document.body.appendChild(hashString)
		}
	}
	reader.readAsArrayBuffer(file)
})

fileFormLabel.innerHTML = 'Choose a file'
fileFormLabel.appendChild(fileForm)
document.body.appendChild(fileFormLabel)

let flotorized = document.createElement('div')
flotorized.innerHTML = 'Files flotorized: calculating...'
document.body.appendChild(flotorized)

let xhr = new XMLHttpRequest()
xhr.onreadystatechange = function() {
	if (xhr.readyState === 4) {
		flotorized.innerHTML = 'Files flotorized: ' + xhr.response
	}
}

xhr.open('GET', '/stats', true)
xhr.send()