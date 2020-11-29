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
        console.log(response.headers);
    })

    test('it serves the this.html page', async () => {
        const response = await request.get('/this'); 
        console.log(response.body);
    })

});
    
    