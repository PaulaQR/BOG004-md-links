    //node methods filesystem - path
    const fs = require('fs');
    const path = require("path");

//Resuelve y normaliza la ruta dada
const converterPath = (pathToConvert) => {
    let converterPathResult;
    path.isAbsolute(pathToConvert) 
        ? converterPathResult = pathToConvert 
        : converterPathResult = path.resolve(pathToConvert).normalize();
    return converterPathResult;
}

// Función para verifica si existe la ruta
const validatePath = (path) => fs.existsSync(path);

// función para saber si es un directorio o archivo si es directorio : true y si es archivo: false
const isDir =  (pathToCheck) => new Promise((resolve) =>{ // sólo verifica si es directorio
    fs.stat(pathToCheck, (err, stats) => {
        if (err) throw err;
        const isDirResult = stats.isDirectory()
        console.log('soy directorio?', isDirResult);
        resolve(isDirResult);
    });
});

//Función para recorrer el contenido de un directorio
const readDirectoryFiles = (checkContentDir) => {
    const dirFiles = fs.readdirSync(checkContentDir);
    console.log(dirFiles);
    return dirFiles;
}

// Función para saber la extención de un archivo
const extensionName = (filePaht) =>{
    const extension = path.extname(filePaht); //obtener la extención del archivo
    return extension;
}

// funcion para revisar si es archivo md y leer su contenido
const isFileMd = (filePath) => {
    const fileExtensionResult = extensionName(filePath);
    if(fileExtensionResult === '.md'){
        return filePath;
    }else{
        const isFileMdError = 'Archivo no tiene extención .md';
        return isFileMdError;
    }
};

// función para leer el contenido de mi archivo
const readFile = (pathToRead) => {
    fs.readFile(pathToRead, 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
    return data;
    });
}




module.exports = {
    converterPath,
    validatePath,
    isDir,
    readDirectoryFiles,
    extensionName,
    isFileMd,
    readFile,
}