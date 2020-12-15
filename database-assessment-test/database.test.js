const path = require('path');
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
let result;


beforeAll(async () => {
    const url = 'mongodb+srv://student:ilovetesting@database-assessment.ivrqc.mongodb.net/database-assessment?retryWrites=true&w=majority';
    await mongoose.connect(url, { useNewUrlParser: true });

    // //seed the database with test data
    // const students = [
    //     {firstName: 'Ben', lastName: 'Kwak', age: 21 },
    //     {firstName: 'Catherine', lastName: 'Chiu', age: 21 },
    //     {firstName: 'Serena', lastName: 'Kuo', age: 21 },
    // ]
    // for (let i = 0; i < 3; i += 1) {
    //     await Student.create(students[i]);
    // };
    
    // //verify data was seeded properly
    // const data = await Student.find({});
    // console.log(data);
});

afterAll(async () => {
    //delete all entries in database and close the connection
    // await Student.deleteMany({});
    await mongoose.connection.close();
});

//currently no tests, so make sure to manually check
xdescribe('Schema', () => {});

xdescribe('POST/student', () => {
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