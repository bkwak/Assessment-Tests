const capitalizeVowels = require('../js/part-1.js');
const reverseChunk = require("../js/part-2.js");
const snakeToCamel = require('../js/part-3.js');
const objToSortedArray = require('../js/part-4.js');

describe("capitalize vowels", () => {
    test("it capitalizes vowels only", () => {
          expect(capitalizeVowels("hello")).toBe("hEllO");
          expect(capitalizeVowels("codesmith")).toBe("cOdEsmIth");
          expect(capitalizeVowels("")).toBe("");
          expect(capitalizeVowels('hEllO wOrld')).toBe('hEllO wOrld');
          expect(capitalizeVowels('HELLO WORLD')).toBe('HELLO WORLD');
    })

    test("it doesn't affect consonants", () => {
        expect(capitalizeVowels("HdlLd")).toBe("HdlLd");
        expect(capitalizeVowels("Why Hello There")).toBe("Why HEllO ThErE");
    })

    test("it works with empty strings", () => {
        expect(capitalizeVowels("")).toBe("");
    })
});

describe("reverse chunk", () =>{
    const zeroToTen = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    test("it works (reverses a subset of the array and returns a new array", () =>{
        expect(reverseChunk(zeroToTen, 2, 6)).toEqual([0, 1, 6, 5, 4, 3, 2, 7, 8, 9, 10]);
        expect(reverseChunk([2, 3, 5, 7, 11], 1, 4)).toEqual([2, 11, 7, 5, 3]);
        expect(reverseChunk([2, 3, 5, 7, 11], 2, 3)).toEqual([2, 3, 7, 5, 11]);
    });
    
    test("it should return a new array", () => {
        expect(reverseChunk(zeroToTen, 2, 6)).not.toBe(zeroToTen);
        expect(zeroToTen).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
    
    test("it handles empty arrays", () => {
        expect(reverseChunk([])).toEqual([]);
    })
    
    test("if the provided start is less than 0, it sets it to 0", () => {
        expect(reverseChunk([2, 3, 5, 7, 11], -1, 2)).toEqual([5, 3, 2, 7, 11]);
        expect(reverseChunk([2, 3, 5, 7, 11], -1, 4)).toEqual([11, 7, 5, 3, 2]);
        expect(reverseChunk([2, 3, 5, 7, 11], -3, 1)).toEqual([3, 2, 5, 7, 11]);
    })    
    
    test("if the provided end is greater than the array length, it sets if to array.length - 1", () => {
        expect(reverseChunk([2, 3, 5, 7, 11], 2, 10)).toEqual([2, 3, 11, 7, 5]);
        expect(reverseChunk([2, 3, 5, 7, 11], 0, 10)).toEqual([11, 7, 5, 3, 2]);
    })
});

describe("snake to camel", () => {

    test("it works", () => {
        expect(snakeToCamel("hello_there_world")).toBe("helloThereWorld");
        expect(snakeToCamel("heLLo_thERE_wORLD")).toBe("heLLoThEREWORLD");
    });

    test("it handles underscores at the beginning of string (capitalizes first char)", () => {
        expect(snakeToCamel("_hello_there_world")).toBe("HelloThereWorld");
    });

    test("it removes leading and trailing underscores from returned string", () =>{
        expect(snakeToCamel("_hello_there_world_")).toBe("HelloThereWorld");
    });
   
    test("it handles empty strings", () => {
        expect(snakeToCamel("")).toBe("");
    });
});

describe("obj to sorted array", () =>{
    const phoneNums = {
        chris: 3429588375,
        andy: 4829574932,
        mildew: 9975723073,
        blake: null
       };

    const sortedResult = Object.entries(phoneNums).sort();
       
    test("it works, and the nested arrays should be sorted", () => {
        expect(objToSortedArray(phoneNums)).toEqual(sortedResult);
        expect(objToSortedArray({name: "jest"})).toEqual([['name', 'jest']]);
        expect(objToSortedArray(phoneNums).length).toBe(sortedResult.length);
    });

    test("it handles empty objects", () => {
        expect(objToSortedArray({})).toEqual([]);
    });
});