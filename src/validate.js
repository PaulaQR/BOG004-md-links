const read = require('./read.js');
//Se importa Fetch para la peticón HTTP 
const { default: fetch }  = require('node-fetch');


const validate = (path) => {
	return read.getLinks(path).then(res =>{
			const array = res.map((link) => fetch(link.href)
			.then((response) => ({
				href: link.href,
				text: link.text,
				file: link.path,
				status: response.status,
				ok: response.ok ? 'OK' : 'FAIL'
			}))
			.catch(() => ({
				href: link.href,
				text: link.text,
				file: link.path,
				status: 404,
				ok: 'FAIL'
			})));
			return Promise.all(array);
	});
};

const stats = (path) => {
	return read.getLinks(path).then(res => {
		const array = res.map((link => link.json));
		const arrUnique = [...new Set(res.map((link) => link.href))];
		return ({
			Total: array.length,
			Unique: arrUnique.length
		});
	});
};

const twOptions = (path) => {
	return validate(path)
	.then(res =>{
		const brokenLinks = res.filter((link) => link.ok !== 'OK');
		const array = res.map((link => link.json));
		const arrUnique = [...new Set(res.map((link) => link.href))];
		return ({
			Total: array.length,
			Unique: arrUnique.length,
			Broken: brokenLinks.length
		});
	});
};

module.exports = {
	validate, 
	stats,
	twOptions
};