//node methods filesystem - path
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

//--------- Función que  Resuelve y normaliza la ruta dada ---------
const converterPath = (pathToConvert) => {
  let converterPathResult;
  const pathAbsolute = path.isAbsolute(pathToConvert);
  pathAbsolute
    ? (converterPathResult = pathToConvert)
    : (converterPathResult = path.resolve(pathToConvert).normalize());
  return converterPathResult;
};

//--------- Función para verifica si existe la ruta ---------
const validatePath = (path) => fs.existsSync(path);

//--------- Función recursiva para leer el contedido de un directorio ---------
const fileSearch = (arrayPaths, fileAbsolutePath) => {
  const isDirResult = fs.statSync(fileAbsolutePath).isDirectory();
  if (isDirResult) {
    const dirFileRes = fs.readdirSync(fileAbsolutePath); //recorrer el contenido de un directorio
    dirFileRes.forEach((file) => {
      const dirAbsolutepath = path.join(fileAbsolutePath, file);
      if (dirFileRes) fileSearch(arrayPaths, dirAbsolutepath);
    });
  } else {
    const fileExtensionRes = path.extname(fileAbsolutePath); //obtine .md
    if (fileExtensionRes === ".md") {
      arrayPaths.push(fileAbsolutePath);
    }
  }
  return arrayPaths;
};

//--------- Función para Extraer Links de archivos .md ---------

const getLinks = (fileContent, Filepath) => {
  const regxLink = new RegExp(
    /\[([\w\s\d.()]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/gm
  );
  const regxUrl = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/gm;
  const regxText = /\[[\w\s\d.()]+\]/;

  const content = fileContent;
  const contentLinks = content.match(regxLink);
  let convertLinks;
  if (contentLinks) {
    convertLinks = contentLinks.map((links) => {
      const linkHref = links.match(regxUrl).join().slice(1, -1);
      const linkText = links.match(regxText).join().slice(1, -1);

      return {
        href: linkHref,
        text: linkText.substring(0, 50),
        file: Filepath,
      };
    });
  } else if (contentLinks === null) {
    return [];
  }
  return convertLinks;
};

// --------- Función para leer los archivos Con Promesa:👇 ---------

const readFileContent = (Filepath) =>
  new Promise((resolve) => {
    const arr = [];
    Filepath.forEach((element) => {
      fs.readFile(element, "utf8", function (err, data) {
        if (err) {
          const errorMessage = "❗ No se puede leer el contenido del archivo";
          console.log(errorMessage);
        } else {
          arr.push(getLinks(data, element));
          if (Filepath.length === arr.length) {
            resolve(arr.flat());
          }
        }
      });
    });
  });

module.exports = {
  converterPath,
  validatePath,
  fileSearch,
  readFileContent,
};
