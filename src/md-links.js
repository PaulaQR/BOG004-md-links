// Importamos Módulos de node
const{
    converterPath,
    validatePath,
    isDir,
    isFileMd,
    readFile,
    readDirectoryFiles
} = require('./nodeMethods.js');

//Función mdLinks
const mdLinks = (args) => new Promise((resolve, reject) => {
    //node methods filesystem - path
    const path = require("path");

//captura de la ruta a partir del array de args
    const terminalPathCacht = args[2];
    console.log(terminalPathCacht);
    console.log('soy ruta absoluta?' , path.isAbsolute(terminalPathCacht));

//convertir ruta capturada en absoluta
    const pathAbsolute = converterPath(terminalPathCacht);
    console.log("path", pathAbsolute);

// Guardo el rersultado e invoco la función pasando como argumento pathAbsolute
    const resultValidatePath  = validatePath(pathAbsolute);
    console.log('Ruta válida?', resultValidatePath);


// Array para guardar el contenido .md
    const pathArray = [];
//Condicional que valida la ruta
    if(resultValidatePath){ // Ingresa sólo si es ruta válida
        isDir(pathAbsolute)//ingresa sólo si es directorio
        .then((isDirResult) => {
            if(isDirResult){
                console.log('Revisar Recursividad');
                const dirFiles = readDirectoryFiles(pathAbsolute);
                resolve(dirFiles);
                //Debería retornar un array con una o más rutas
            }else{
                console.log('Guardar la ruta md en array');
                const isFileMdResult = isFileMd(pathAbsolute);
                pathArray.push(isFileMdResult);
                console.log(pathArray)
                const fileContent = readFile(pathAbsolute); // debe leer el contenido del Archivo .md
                resolve(fileContent);
            }
        })
        .catch((error) => {
            console.log('Soy error', error);
        });
    }else{
        const invalidPath = 'Ruta no válida';
        console.log(invalidPath);
        return invalidPath;
    }

    
});






// otenemos la ruta absoluta del directorio y del archivo actual
// const dirName = path.dirname(__dirname); //El dirname obtiene la ruta  
// const fileName = path.dirname(__filename); //__filename es el archivo actual en el que estoy
// console.log('directory-name :', dirName, 'file-name :', fileName);

module.exports = mdLinks;