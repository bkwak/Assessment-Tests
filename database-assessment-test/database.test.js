const path = require('path');
const mongoose = require("mongoose");
const app = require('../main.js');
const supertest = require('supertest')
const request = supertest(app);
const Student = require('../StudentModel')

const db = 

beforeAll(async () => {
    const url = 'mongodb+srv://student:ilovetesting@database-assessment.ivrqc.mongodb.net/database-assessment?retryWrites=true&w=majority';
    await mongoose.connect(url, { useNewUrlParser: true });

    //seed the database with test data
    const students = [
        {firstName: 'Ben', lastName: 'Kwak', age: 21 },
        {firstName: 'Catherine', lastName: 'Chiu', age: 21 },
        {firstName: 'Serena', lastName: 'Kuo', age: 21 },
    ]
    for (let i = 0; i < 3; i += 1) {
        await Student.create(students[i]);
    };
    
    //verify data was seeded properly
    const data = await Student.find({});
    console.log(data);
});

afterAll(async () => {
    //delete all entries in database and close the connection
    await Student.deleteMany({});
    await mongoose.connection.close();
});

//currently no tests, so make sure to manually check
xdescribe('Schema', () => {});

describe('POST/student', () => {

    test('Must be a correctly set up POST route', () => {
        expect(2).toBeTruthy();
    })

    xtest('Correctly create a new document in the database', () => {

    })



});
