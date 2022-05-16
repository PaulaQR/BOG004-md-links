#!/usr/bin/env node

const read = require('./mdlinks.js');
const { validate, stats, twOptions } = require('./validate.js');
const path = process.argv[2];

let options = {
    validate: false,
    stats: false
};

/* esta Funcion nos ayudara a dar opciones al objeto options */


if (process.argv.includes('--validate') && process.argv.includes('--stats')) {
    options.validate = true;
    options.stats = true;
    twOptions(path).then(res => console.log(' Total: ', res.Total, '\n', 'Unique: ', res.Unique,  '\n', 'Broken: ', res.Broken));
} else if (process.argv.includes('--stats')) {
    options.stats = true;
    stats(path).then(res => console.log(' Total: ', res.Total, '\n', 'Unique: ', res.Unique));
} else if (process.argv.includes('--validate')) {
    options.validate = true;
    // eslint-disable-next-line no-console
    console.log('validate');
    validate(path).then(res => console.log(' Href: ',  
    res.map((link) => link.file+ ' ' + link.href + ' ' + link.ok + ' ' + link.status + ' '+ link.text)));
    
} else {``
    read.mdLinks(path, { validate: true }).then(res => console.log(res))
        .catch(()=>{
        // eslint-disable-next-line indent
         console.log('POR FAVOR ESCRIBE UNA RUTA');
        });
}