const mongoose = require("mongoose");
const app = require('../main.js');
const supertest = require('supertest')
const request = supertest(app);
const Student = require('../StudentModel')


const newStudent = {
    firstName: 'Barack',
    lastName: 'Obama',
    age: 60
};


beforeAll(async () => {
    const url = 'mongodb+srv://student:ilovetesting@database-assessment.ivrqc.mongodb.net/database-assessment?retryWrites=true&w=majority';
    await mongoose.connect(url, { useNewUrlParser: true });
});

afterAll(async () => {
    //delete all entries in database and close the connection
    await Student.deleteMany({});
    await mongoose.connection.close();
});

describe('POST/student', () => {
    let result;

    test('it must be a correctly set up POST route', async (done) => {
        const res = await request.post('/student').send(newStudent);
        result = res.body;
        expect(res.status).toBe(200);
        done();
    })

    test('it correctly creates a new document in the database', async (done) => {
        const document = await Student.findOne({firstName: 'Barack',lastName: 'Obama',age: 60});
        expect(document).toMatchObject(newStudent);
        done();
    })

    test('it must send newly created document back to client', () => {
        expect(result).toMatchObject(newStudent);
    })

    test('Proper error handling: the response must have status code 418', async (done) => {
        const res = await request.post('/student').send({nonsense: true});
        expect(res.status).toBe(418);
        done();
    })
});

describe('GET /student/:name', () => {
    test('it correctly retrieves document from the database', async (done) => {
        const res = await request.get('/student/Barack');
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toMatchObject(newStudent);
        done();
    });
});

describe('PATCH /student/:name', () => {
    test('it  Updates document in the database correctly', async (done) => {
        const newerStudent = {firstName: 'Barackalicious'};
        await request.patch('/student/Barack').send(newerStudent);
        const result = await Student.findOne({firstName: 'Barackalicious'});
        expect(result).toMatchObject({...newStudent, ...newerStudent});
        done();
    });

    test('Proper error handling: the response must have status code 418', async (done) => {
        const res = await request.patch('/student/12345').send({firstName: new Error()});
        expect(res.status).toBe(418);
        done();
    })
});

describe('DELETE /student/:name', () => {
    test('Uses name to delete document from database', async (done) => {
        let result = await Student.findOne({firstName: 'Barackalicious'});
        expect(result).toBeTruthy();
        
        await request.delete('/student/Barackalicious');
        result = await Student.findOne({firstName: 'Barackalicious'});
        expect(result).toBeNull();
        done();
    });
});