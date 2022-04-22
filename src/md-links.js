// Módulos de node
const mdLinks = (args) => {
    //node methods filesystem - path
    const fs = require('fs');
    const path = require("path");

    //captura de la ruta a partir del array de args
    const terminalPath = args[2];

    //Resuelve y normaliza la ruta
    const pathAbsolute = path.resolve(terminalPath).normalize();
    console.log('Hola ya soy absoluta', pathAbsolute);

    // verifica si existe la ruta
    const validatePath = (path) => fs.existsSync(path);
    

    // función para saber si es un directorio o archivo si es directorio : true y si es archivo: false
    const isFileOrDirectory =  (pathToCheck) =>{
        fs.stat(pathToCheck, (err, stats) => {
            if (err) throw err;
            console.log('soy directorio?', stats.isDirectory());
        });
    }
    // función para leer el contenido de mi archivo
    const readFile = (pathToRead) => {
        fs.readFile(pathToRead, 'utf8', function(err, data) {
        if (err) throw err;
        console.log(data);
        });
    }
    // Guardo el rersultado e invoco la función pasando conmo argumento pathAbsolute
    const resultValidatePath  = validatePath(pathAbsolute);

    if(resultValidatePath === true ){
        isFileOrDirectory(pathAbsolute)
        readFile(pathAbsolute);
    }else{
        console.log('Fin del programa');
    }

}




// const extension = path.extname('./prueba.md'); //obtener la extención del archivo
// console.log(extension);

// otenemos la ruta absoluta del directorio y del archivo actual
// const dirName = path.dirname(__dirname); //El dirname obtiene la ruta  
// const fileName = path.dirname(__filename); //__filename es el archivo actual en el que estoy
// console.log('directory-name :', dirName, 'file-name :', fileName);

module.exports = mdLinks;