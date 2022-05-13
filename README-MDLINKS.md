# Markdown Links

## Índice

* [1. Diagrama de flujo](#1-diagrama-de-flujo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Librerias utilizadas](#3-librerias-utilizadas)
* [4. Lenguajes utilizados](#4-lenguajes-utilizados)
* [5. Pruebas unitarias](#5-pruebas-unitarias)
* [6. Instalación](#6-instalacion)
* [7. Ejemplos implementación lineas de comando](#7-ejemplos-implementacion-lineas-de-comando)
* [8. Opciones](#opciones)
* [9. Creado por](#9-creado-por)

***
## 1. Diagrama de Flujo
![Diagrama de flujo API](diagramas/diagrama1.jpg)
![Diagrama de flujo CLI](diagramas/diagrama2.jpg)
## 2. Resumen del proyecto
mdlink es una librería que nos permite recorrer y leer directorios y archivos dados por el usuario para extraer los links presentes en los archivos Markdown (.md) y posteriormente analizarlos.

## 3. Librerías utilizadas
 - node-fetch
 - fs
 - path

## 4. Lenguajes utilizados
Este código fue desarrollado con javascript.

## 5. Pruebas unitarias
Se realizaron pruebas unitarias utilizando jest

## 6. Instalación
Ingresa este comando en tu consola de PowerShell o git bash + Enter.
npm install --save https://github.com/PaulaQR/BOG004-md-links.git"

## 7. Ejemplos implementación lineas de comando

Ejemplo en Terminal PowerShell: Ingresando mdlink + ruta del directorio o archivo a explorar
```sh
PS C:\Users\paulaquintero\Desktop\BOG004-md-links>  mdlink ./files
[
  {
    href: 'https://www.youtube.com/watch?v=xCQvrbMqMG0&ab_channel=TiffInTech',
    text: 'YOUTUBE - Tiff In Tech',
    file: '/Users/paulaquintero/Desktop/BOG004-md-links/src/files/linkTres.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'https://www.linkedin.com/in/paulaquinteror/',
    text: 'Linkedin',
    file: '/Users/paulaquintero/Desktop/BOG004-md-links/src/files/link.md',
    status: 429,
    ok: 'FAIL'
  },
]
```

Ejemplo en Terminal Bash: Ingresando mdlink + ruta del directorio o archivo a explorar
```sh
$  mdlink ./files
[
  {
    href: 'https://www.facebook.com/profile.php?id=100049483710983',
    text: 'facebook',
    file: '/Users/paulaquintero/Desktop/BOG004-md-links/src/files/facebook.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'https://www.linkedin.com/in/paulaquinteror/',
    text: 'linkedin',
    file: '/Users/paulaquintero/Desktop/BOG004-md-links/src/files/facebook.md',
    status: 429,
    ok: 'FAIL'
  },
]
```
## 8. Opciones
--validate: Esta opción nos permite validar los links que estan dentro de los archivos .md
```sh
$  md-links ./carpetaParaPruebas/archivomd.md --validate
validate
 Href:  [
  'files/link.md https://www.linkedin.com/in/paulaquinteror/ FAIL 429 Linkedin',
  'files/linkDos.md https://www.instagram.com/p4u_4rt/ OK 200 Instagram',
  'files/facebook.md https://www.facebook.com/profile.php?id=100049483710983 OK 200 facebook',
  'files/facebook.md https://nodejs.org/es/ OK 200 node',
  'files/facebook.md https://www.linkedin.com/in/paulaquinteror/ FAIL 429 linkedin',
  'files/facebook.md https://www.instagram.com/p4u_4rt/ OK 200 instagram',
  'files/linkTres.md https://www.youtube.com/watch?v=xCQvrbMqMG0&ab_channel=TiffInTech OK 200 YOUTUBE - Tiff In Tech'
]
```

--stats: Muestra las estadisticas de los links, el total corresponde al número total de los links encontrados en los archivos md de la ruta correspondiente, y unique corresponde al numero de links contando solo una vez los que estan repetidos.
```sh
$  mdlink ./files --stats
 Total:  2 
 Unique:  2
```

--validate --stats: Esta opción combinada nos muestra las estadisticas y además nos muestra los broken, que corresponde al número de links rotos que encuentra.
```sh
$  mdlink ./files --validate --stats
 Total:  2 
 Unique:  2
 Broken:  1
```

## 9. Creado por
Paula Quintero [Paula Quintero ] 


