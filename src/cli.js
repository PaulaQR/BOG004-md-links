#!/usr/bin/env node
//se importa la función md-links
const MDLINKS = require("./read.js");

const process = require('process');
const { resolve } = require('path');


//Captura argumentos desde la Terminal
const pathArg = process.argv[2];
const optionsArg = {};

if(process.argv.includes('--validate')){
    optionsArg.validate = true;
}


const CLI = () => {
    MDLINKS(pathArg, optionsArg)
    .then((result) => {
        // resolve(result)
        console.log('CLI',result)
    })
    .catch((error) => {
        console.log(error);
    })
}

CLI();