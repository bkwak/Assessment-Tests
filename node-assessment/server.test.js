const app = require('../server.js');
const supertest = require('supertest')
const request = supertest(app);


describe("GET /this", () => {
    test('it sets the status to 200', async () => {
        const response = await request.get('/this'); 
        expect(response.status).toBe(200);
    });

    test('it sets the header of `Content-Type` to `text/html; charset=UTF-8`', async () => {
        const response = await request.get('/this'); 
        expect(response.headers['content-type']).toBe('text/html');
        expect(response.headers['charset']).toBe('utf-8');
    })

    test('it serves the this.html page', async (done) => {
        const response = await request.get('/this'); 
        const file = response.text;
        fs.readFile(path.join(__dirname,'../client/this.html'), (err, contents) => {
            if(err) console.error(err);
            expect(file).toBe(contents.toString());
            done();
        });
    });
});

describe("GET /that", () => {
    test('it sets the status to 200', async () => {
        const response = await request.get('/that'); 
        expect(response.status).toBe(200);
    });

    test('it sets the header of `Content-Type` to `text/html; charset=UTF-8`', async () => {
        const response = await request.get('/that'); 
        expect(response.headers['content-type']).toBe('text/html');
        expect(response.headers['charset']).toBe('utf-8');
    });

    test('it serves the that.html page', async (done) => {
        const response = await request.get('/that'); 
        const file = response.text;
        fs.readFile(path.join(__dirname,'../client/that.html'), (err, contents) => {
            if(err) console.error(err);
            expect(file).toBe(contents.toString());
            done();
        });
    });
});
    
describe("GET /fancy", () => {
    test('it sets the status to 200', async () => {
        const response = await request.get('/fancy'); 
        expect(response.status).toBe(200);
    });

    test('it sets the header of `Content-Type` to `text/html; charset=UTF-8`', async () => {
        const response = await request.get('/fancy'); 
        expect(response.headers['content-type']).toBe('text/html');
        expect(response.headers['charset']).toBe('utf-8');
    });

    test('it serves the fancy.html page', async (done) => {
        const response = await request.get('/fancy'); 
        const file = response.text;
        fs.readFile(path.join(__dirname,'../client/fancy.html'), (err, contents) => {
            if(err) console.error(err);
            expect(file).toBe(contents.toString());
            done();
        });
    });
});
    
describe("GET /styles.css", () => {
    test('it sets the status to 200', async () => {
        const response = await request.get('/styles.css'); 
        expect(response.status).toBe(200);
    });

    test('it sets the header of `Content-Type` to `text/html; charset=UTF-8`', async () => {
        const response = await request.get('/styles.css'); 
        expect(response.headers['content-type']).toBe('text/css');
        expect(response.headers['charset']).toBe('utf-8');
    });

    test('it serves the styles.css.html page', async (done) => {
        const response = await request.get('/styles.css'); 
        const file = response.text;
        fs.readFile(path.join(__dirname,'../client/styles.css'), (err, contents) => {
            if(err) console.error(err);
            expect(file).toBe(contents.toString());
            done();
        });
    });
});

describe("404 page", () => {
    test('it sets the status to 404', async () => {
        const response = await request.get('/sdkfjh128'); 
        expect(response.status).toBe(404);
    });

    test('it sets the header of `Content-Type` to `text/html; charset=UTF-8`', async () => {
        const response = await request.get('/sdkfjh128'); 
        expect(response.headers['content-type']).toBe('text/html');
        expect(response.headers['charset']).toBe('utf-8');
    });

    test('it serves the styles.css.html page', async (done) => {
        const response = await request.get('/sdkfjh128'); 
        const file = response.text;
        fs.readFile(path.join(__dirname,'../client/404.html'), (err, contents) => {
            if(err) console.error(err);
            expect(file).toBe(contents.toString());
            done();
        });
    });
});