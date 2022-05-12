
//Importando modulos de node 
const {
  routeExist,
  archivoODirectorio,
  extraerLinks,
	readFileCallback
} = require("./node.js");


const fs = require('fs');
const path = require('path');




const readFile = file => {
  return new Promise((resolve,reject) => {
    fs.promises.readFile(file, 'utf-8')
      .then(resp => resolve(resp))
      .catch(() => reject('Error al leer los archivos'))
  })
}


const probando = readFile('../ArchivosMD/facebook.md')
.then(respuesta => respuesta)
.catch(respuesta => respuesta)
probando.then(resp => console.log(resp))




module.exports = readFile;