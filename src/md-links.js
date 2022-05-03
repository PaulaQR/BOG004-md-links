// Importamos Módulos de node
const{
    converterPath,
    validatePath,
    fileSearch,
    readFileContent,
} = require('./nodeMethods.js');

//--------- node methods filesystem - path ---------
const chalk = require("chalk");
const path = require("path");
const { read, link } = require('fs');

//--------- Función mdLinks ---------
const mdLinks = (args) => new Promise((resolve, reject) => {

//--------- captura de la ruta a partir del array de args ---------
    const terminalPathCacht = args[2];

//--------- convertir ruta capturada en absoluta ---------
    const pathAbsolute = converterPath(terminalPathCacht);

//--------- Guardo el rersultado e invoco la función pasando como argumento pathAbsolute ---------
    const resultValidatePath  = validatePath(pathAbsolute);


//--------- Condicional que valida la ruta y la recursividad invocando la función fileSearch desde nodeMethods ---------
 let arrayFilePathMd = [];
 if(resultValidatePath) {
    fileSearch(arrayFilePathMd, pathAbsolute);// invocamos la función que nos da la recursividad
    // console.log('⋆⌘⋆  ────────── Array de archivos .md ⋆⌘⋆  ────────── ' , filesMdResp);
} else {
    const invalidPath = '👎 La ruta ingresada no es válida'
    console.log(chalk.redBright.bold(invalidPath));
}

//--------- Con promesa:👇 ---------
// console.log(chalk.cyan.bold('─────❀◦❀◦❀───── ReadFiles desde md-links ─────❀◦❀◦❀─────'));
readFileContent(arrayFilePathMd)
    .then((objectLinks)=>{
        console.group(chalk.blueBright.italic('━━━━━━ ✧ ❃ ✧ ━━━━━━ Links obtenidos: ━━━━━━ ✧ ❃ ✧ ━━━━━━') , objectLinks);
    })
    .catch((error)=>{
        const errorMessage = 'Error'
        reject(error, errorMessage)
    });
// readFileContent(arrayFilePathMd)
//     .then((objectLinks)=>{
//         console.group(objectLinks);
//     })
//     .catch((error)=>{
//         const errorMessage = '❌ Error'
//         reject(error, errorMessage)
//     });
})



module.exports = mdLinks;