//Métodos de node FS - Path
const fs = require('fs');
const path = require('path');


//Fetch para  la peticón Http 
const {default: fetch }  = require('node-fetch');


// Verificar si la ruta existe

const ruta = '../ArchivosMD';
const routeExist = (route) => {
	const rutaRes = path.resolve(route);
	return new Promise((resolve, reject) => {
		fs.access(rutaRes, fs.constants.F_OK, (err) =>{
			const existPath = err ? 'no existe' : 'Existe';
			if (existPath === 'Existe'){
				console.log(rutaRes)
				resolve(rutaRes);
			}
			reject('No existe la ruta');
		});
})
}

// Es un archivo o directorio 

const archivoODirectorio = (ruta) => {
	let arrayElementos = []
	if(fs.statSync(ruta).isFile()){
		arrayElementos.push(ruta)
	} else {
		fs.readdirSync(ruta).forEach(file => {
			let savePath = path.join(ruta, file)
			if(fs.statSync(savePath).isDirectory()){
			 arrayElementos = arrayElementos.concat(archivoODirectorio(savePath))
					 
			} else {
				arrayElementos.push(savePath)
			}
		})
	}
	return arrayElementos
}



//Lee el archivo

const readFileCallback = (file, callback) => {
	return fs.promises.readFile(file, 'utf-8')
		.then(string => callback(string))
		.catch(() => 'lanzó error')
}





//Extraer los links  
const extraerLinks = (string, file) => {
	return new Promise((resolve, reject) =>{
		const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm; // []()
				const matches = string.match(regexMdLinks)
if(matches === null){
	reject('No se encontraron links')
} else {
const singleMatch = /\[([^\[]+)\]\((.*)\)/
// { [](), [], ()}
const arr = matches.map((link) => {
	let text = singleMatch.exec(link)
	return ({
		href: text[2],
		text: text[1],
		file,
	})
})
	resolve console.log(arr)
		}
	})
}


// Petición HTTP
const validarHttp = arr => {
	//arr es el array del objeto 
	return new Promise((res, rej)=>{
		const arrayValidado = arr.map((item) => fetch(item.href) 
		.then((res) => ({
			href: item.href,
			text: item.text,
			file: item.file,
			status: response.status,
			ok: res.ok ? 'Ok' : 'FAIL'
		}))
		.catch((err) => ({
			href: item.href,
			text: item.text,
			file: item.file,
			status: 404 ,
			ok: 'FAIL'
			})));
			return Promise.all(arrayValidado);
		})
	}

	routeExist(ruta)
.then(res => {
	return archivoODirectorio(res)
})
.then( res => {
	console.log('respuesta', res)
})
.catch( error => {
	console.log(error)
})

readFileCallback('../ArchivosMD/facebook.md', (response) =>{
	return extraerLinks(response, '../ArchivosMD/facebook.md', (array) =>{
		return validarHttp(array)
	})
})
.then(final => console.log('final', final))

/*
			readFileCallback ('../ArchivosMD/facebook.md')
			.then(string => {
				return extraerLinks(string, '../ArchivosMD/facebook.md')
			})
			.then(array => {
				return validarHttp(array)
			})
			.then(respuesta => console.log('final', respuesta))
			.catch(error => console.log('error:', error))
*/

/*
			const absoluta = (ruta) => {
				return new Promise((resolve) => {
					path.isAbsolute(ruta) ? resolve(ruta) : resolve(path.resolve(ruta))
				})}

			const extensionMD = (ruta) => new Promise((resolve) => resolve(path.extname(ruta)))

			promise.all([absoluta('../ArchivosMD/facebook.md'), extensionMD('../ArchivosMD/facebook.md')])
			.then(resp => console.log('resp', resp))
*/

		
module.exports = {
	routeExist,
	archivoODirectorio, 
	readFileCallback,
	extraerLinks,
	validarHttp,
}

