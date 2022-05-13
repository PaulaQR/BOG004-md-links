/* eslint-disable no-undef */
const { readRoute, fileOrDirectory, readDirectory, readFiles, extMd, getMdFiles, getLinks } = require('../src/read.js');

// eslint-disable-next-line no-undef
describe('readRoute', () => {
    // eslint-disable-next-line no-undef
    it('es una función', () => {
        // eslint-disable-next-line no-undef
        expect(typeof readRoute).toBe('function');
    });
    // eslint-disable-next-line no-undef
    it('convierte una ruta relativa a absoluta', () => {
        let pathR = './files/facebook.md';
        let result = 'C:\\Users\\paulaquintero\\Desktop\\BOG004-md-links\\files\\facebook.md';
        expect(readRoute(pathR)).toBe(result);
    });
});

describe('fileOrDirectory', () => {
    it('es una funcion', () => {
        expect(typeof fileOrDirectory).toBe('function');
    });
    /* it('es un directorio',()=>{
        expect(fileOrDirectory('./carpetaParaPruebas').toBe('true'));
    }); */
});
describe('readDirectory', () => {
    it('es una función', () => {
        expect(typeof readDirectory).toBe('function');
    });
    it('deberia retornar un array con el contenido del directorio', () => {
        expect(getMdFiles('./files').length).toBe(4);
    });
});

describe('readFiles', () => {
    it('es una función', () => {
        expect(typeof readFiles).toBe('function');
    });

    test('debería leer un archivo', () => {
        return readFiles('./files').then(data => {
            expect(data.json).not.toBe(0);
        });
    });
    test('debería rechazar la promesa', () => {
        return expect(readFiles('./package.json')).rejects.toMatch('No es archivo de extensión .md');
    });
});

describe('extMd', () => {
    it('es una función', () => {
        expect(typeof extMd).toBe('function');
    });

    it('debería ser true para una archivo .md', () => {
        expect(extMd('README.md')).toBe(true);
    });
});

describe('getMdFiles', () => {
    it('es una función', () => {
        expect(typeof getMdFiles).toBe('function');
    });
    it('deberia retornar un array de archivos .md', () => {
        expect(getMdFiles('./README.md').length).toBe(1);
    });
});

describe('getLinks', () => {
    it('es una función', () => {
        expect(typeof getLinks).toBe('function');
    });
    it('debe retornar array de objetos con los links encontrados', () => {
        return getLinks('./carpetaParaPruebas/archivomd.md').then(data => {
            expect(data.length).toBe(2);

        });
    });
});