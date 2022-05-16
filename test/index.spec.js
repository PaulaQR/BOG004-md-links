/* eslint-disable no-undef */
const { readRoute, fileOrDirectory, readDirectory, readFiles, extMd, getMdFiles, getLinks } = require('../src/read.js');
const { mdLinks } = require('../src/mdlinks.js');

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
        let result = '/Users/paulaquintero/Desktop/BOG004-md-links/files/facebook.md';
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

describe('readFiles', () => {
    it('es una función', () => {
        expect(typeof readFiles).toBe('function');
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



const path = '/Users/paulaquintero/Desktop/BOG004-md-links/test/files/facebook.md';
const arrayObjeto = [
    {
      href: 'https://www.facebook.com/profile.php?id=100049483710983',
      text: 'facebook',
      file: '/Users/paulaquintero/Desktop/BOG004-md-links/src/files/facebook.md'
    }
  ];

  describe.only('mdlinks', () => {
      xit('should be a function', () => {
          expect(typeof mdLinks).toBe('function');
      });
      xit('should return a promise', (done) =>{
          //console.log(process.cwd())
          expect(mdLinks(path, {}) instanceof Promise).toBeTruthy()
      });
      it('should return a promise 3', async (done) => {
       
        await mdLinks(path, {validate:false}).then(respuesta => {
            
            console.log('RESPUESTA', respuesta);
            expect(respuesta).toEqual(arrayObjeto)
        })
        done()
      })
  })
  
  