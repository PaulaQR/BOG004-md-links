// Importamos Módulos de node
const{
    converterPath,
    validatePath,
    fileSearch,
    readFilesContent,
} = require('./nodeMethods.js');

//node methods filesystem - path
const path = require("path");
const { read } = require('fs');

//Función mdLinks
const mdLinks = (args) => new Promise((resolve, reject) => {

//captura de la ruta a partir del array de args
    const terminalPathCacht = args[2];
    console.log('🆗  Terminal cacht', terminalPathCacht);

//convertir ruta capturada en absoluta
    const pathAbsolute = converterPath(terminalPathCacht);
    console.log("✔️  PATH", pathAbsolute);

// Guardo el rersultado e invoco la función pasando como argumento pathAbsolute
    const resultValidatePath  = validatePath(pathAbsolute);
    console.log('✔️  Ruta válida?', resultValidatePath);

//Leer
// console.log('holas soy array', readFiles);


//Condicional que valida la ruta y la recursividad invocando la función fileSearch desde nodeMethods
let arrayFilePathMd = [];
if(resultValidatePath) {
    const filesMdResp = fileSearch(arrayFilePathMd, pathAbsolute);// invocamos la función que nos da la recursividad
    console.log('👋 Hola desde md-links', filesMdResp);
}else {
    const invalidPath = '❌ La ruta ingresada no es válida'
    console.log(invalidPath)
}

//sin Promesa:👇
// console.log('******** 📚  ReadFiles desde md-links ********');
// readFilesContent(arrayFilePathMd);

//Con promesa:👇
console.log('******** 📚  ReadFiles desde md-links ********');
// let readLinks = readFilesContent(arrayFilePathMd)
// console.log(readLinks, 'holaaaa soy readLinks desde Md-Links');
readFilesContent(arrayFilePathMd)
    .then((objectLinks)=>{
        console.log('📚  ReadFiles desde md-links', objectLinks);
    })
    .catch((error)=>{
        const errorMessage = '❌ Error'
        reject(error, errorMessage)
    });

})



module.exports = mdLinks;