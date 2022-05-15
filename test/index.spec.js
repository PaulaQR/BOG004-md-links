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

/*
const mdlinks = require('../src/mdlinks.js');

const path = '../test/files/facebook.md';
const arrayObjeto = [
    {
      href: 'https://www.facebook.com/profile.php?id=100049483710983',
      text: 'facebook',
      file: '/Users/paulaquintero/Desktop/BOG004-md-links/src/files/facebook.md',
      status: 200,
      ok: 'OK'
    },
    {
      href: 'https://nodejs.org/es/',
      text: 'node',
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
    {
      href: 'https://www.instagram.com/p4u_4rt/',
      text: 'instagram',
      file: '/Users/paulaquintero/Desktop/BOG004-md-links/src/files/facebook.md',
      status: 200,
      ok: 'OK'
    }
  ];

  describe('mdlinks', () => {
      it('should be a function', () => {
          expect(typeof mdlinks).toBe('function');
      });
      it('should return a promise', (done) =>{
          console.log(process.cwd())
          expect(mdlinks(path, {}) instanceof Promise).toBeTruthy()
      });
      it('should return a promise 3', (done) => {
          mdlinks(path, {}).then((paths) => {
            console.log(paths);
          })
      })
  })
  
  */