//node methods filesystem - path
const fs = require("fs");
const path = require("path");
// --- NO SE PUEDE USAR EVITA ASINCRONIA --- //
// const readFileContent = (pathToRead) => {
//     const content = fs.readFileSync(pathToRead, 'UTF-8');
//     return content;
// };

//Resuelve y normaliza la ruta dada
const converterPath = (pathToConvert) => {
  let converterPathResult;
  const pathAbsolute = path.isAbsolute(pathToConvert);
  console.log("✔️  SOY RUTA ABSOLUTA ?", pathAbsolute);
  pathAbsolute
    ? (converterPathResult = pathToConvert)
    : (converterPathResult = path.resolve(pathToConvert).normalize());
  return converterPathResult;
};

// Función para verifica si existe la ruta
const validatePath = (path) => fs.existsSync(path);

//Función recursiva para leer el contedido de un directorio
const fileSearch = (arrayPaths, fileAbsolutePath) => {
  const isDirResult = fs.statSync(fileAbsolutePath).isDirectory();
  if (isDirResult) {
    const dirFileRes = fs.readdirSync(fileAbsolutePath); //recorrer el contenido de un directorio
    dirFileRes.forEach((file) => {
      const dirAbsolutepath = path.join(fileAbsolutePath, file);
      fileSearch(arrayPaths, dirAbsolutepath);
    });
  } else {
    const fileExtensionRes = path.extname(fileAbsolutePath); //obtine .md
    if (fileExtensionRes === ".md") {
      arrayPaths.push(fileAbsolutePath);
    }
  }
  return arrayPaths;
};

// Sin Promesa:👇
const readFilesContent = (pathToRead) => {
  pathToRead.forEach((element) => {
    fs.readFile(element, "utf8", function (err, data) {
      if (err) {
        const errorMessage = " ❌ No se puede leer el contenido del archivo";
        console.log(errorMessage);
      } else {
        console.log(data);
        getLinks(data, element);
      }
    });
  });
};

// const readFilesContent = (pathToRead) => {
//     const content = fs.readFileSync(pathToRead, 'UTF-8');
//     return content;
// };

// Función para leer los archivos Con Promesa:👇
// const readFilesContent = (pathToRead) => new Promise ((resolve) => {
//     pathToRead.forEach((element) => {
//         fs.readFile(element, 'utf8', function(err, data) {
//         if (err){
//             const errorMessage = '❗ No se puede leer el conbtenido del archivo';
//             console.log(errorMessage);
//         }else{
//             Promise.all(data).then(values => {
//                 console.log(values);
//             });
//         }
//         });
//     })
// });

//Función para Extraer Links de archivos .md

const getLinks = (fileContent, myPath) => {
    const content = fileContent.toString();
    const regxLink = new RegExp (/\[([\w\s\d.()]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg);
    const contentLinks = content.match(regxLink);
    console.log(myPath, contentLinks);

    // const regxUrl = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
    // const regxText = /\[[\w\s\d.()]+\]/;

    // const links = {
    //     href: '',
    //     text: '',
    //     file: ''
    // }

};

module.exports = {
  converterPath,
  validatePath,
  fileSearch,
  readFilesContent,
};
