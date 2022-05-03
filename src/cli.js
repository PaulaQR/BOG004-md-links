#!/usr/bin/env node
const mdLinks = require('./md-links.js');
const process = require('process');
const chalk = require('chalk');

//Captura argumentos desde la Terminal
const terminalArguments = process.argv;

const cliFuntion = () => {
    mdLinks(terminalArguments)
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error);
    })
}

cliFuntion();