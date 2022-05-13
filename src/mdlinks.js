
const fs = require('fs');
const md = require('./read.js');
const { validate } = require ('./validate.js');

const mdLinks = (path, options) => {
	const promise = new Promise((resolve, reject) =>{
		const absoluteRoute = md.readRoute(path);
			if (fs.existsSync(absoluteRoute) === false) {
				reject(new Error('La ruta ingresada es invalida'));
			} else {
				if (options.validate === true) {
					validate(absoluteRoute).then(res => resolve(res));
				} else {
					md.getLinks(absoluteRoute). then(res => resolve(res));
				}
			}
	});
	return promise; 
};

module.exports = {
	mdLinks,
};
