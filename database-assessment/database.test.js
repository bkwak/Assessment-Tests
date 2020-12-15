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

const newStudent1 = {
    firstName: 'Donald',
    lastName: 'Trump',
    age: 60
}

const newStudent2 = {
    firstName: 'someone',
    lastName: 'else',
    age: 50
}

beforeAll(async () => {
    const url = 'mongodb+srv://student:ilovetesting@database-assessment.ivrqc.mongodb.net/database-assessment?retryWrites=true&w=majority';
    await mongoose.connect(url, { useNewUrlParser: true });

    //seed the database with test data
    await Student.create(newStudent1);
    await Student.create(newStudent2);

    //verify that the entries were properly added
    const results = await Student.find({});
    console.log(results);
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
        const document = await Student.findOne({ firstName: 'Barack', lastName: 'Obama', age: 60 });
        expect(document).toMatchObject(newStudent);
        done();
    })
    
    test('it must send newly created document back to client', () => {
        if (Array.isArray(result)) expect(result[0]).toMatchObject(newStudent);
        else if (Object.getPrototypeOf(result) === 'Object') expect(result).toMatchObject(newStudent);
    })
    
    test('Proper error handling: the response must have status code 418', async (done) => {
        const res = await request.post('/student').send({ firstName: new Error() });
        expect(res.status).toBe(418);
        done();
    })
});

describe('GET /student/:name', () => {
    test('it correctly retrieves document from the database', async (done) => {
        const res = await request.get('/student/Donald');
        if (Array.isArray(res)) {
            expect(res.body).toHaveLength(1);
            expect(res.body[0]).toMatchObject(newStudent1);
        }
        else if (Object.getPrototypeOf(res.body) === 'Object') expect(res.body).toMatchObject(newStudent1);
        done();
    });
});

describe('PATCH /student/:name', () => {
    test('it  Updates document in the database correctly', async (done) => {
        const newerStudent = { firstName: 'Donaldino' };
        await request.patch('/student/Donald').send(newerStudent);
        const result = await Student.findOne({ firstName: 'Donaldino' });
        expect(result).toMatchObject({ ...newStudent1, ...newerStudent });
        done();
    });
});

describe('DELETE /student/:name', () => {
    test('Uses name to delete document from database', async (done) => {
        let result = await Student.findOne({ firstName: 'someone' });
        expect(result).toBeTruthy();

        await request.delete('/student/someone');
        result = await Student.findOne({ firstName: 'someone' });
        expect(result).toBeNull();
        done();
    });
});