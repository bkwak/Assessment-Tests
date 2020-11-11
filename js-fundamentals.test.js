const { chunkItUp,
    lockDown,
    arrDimensions,
    maxBy} = require('../part-1/main.js');

describe('chunkItUp', () => {
    test("it works", () => {
        expect(chunkItUp(["a", "b", "c", "d"], 2)).toEqual([["a", "b"], ["c", "d"]]);
        expect(chunkItUp([0, 1, 2, 3, 4, 5], 3)).toEqual([[0, 1, 2], [3, 4, 5]]);
        expect(chunkItUp([0, 1, 2, 3, 4, 5], 4)).toEqual([[0, 1, 2, 3], [4, 5]]);
        expect(chunkItUp([0, 1, 2, 3, 4, 5], 2)).toEqual([[0, 1], [2, 3], [4, 5]]);
        expect(chunkItUp([0, 1, 2, 3, 4, 5, 6], 3)).toEqual([[0, 1, 2], [3, 4, 5], [6]]);
        expect(chunkItUp([0, 1, 2, 3, 4, 5, 6, 7, 8], 4)).toEqual([[0, 1, 2, 3], [4, 5, 6, 7], [8]]);
        expect(chunkItUp([0, 1, 2, 3, 4, 5, 6, 7, 8], 2)).toEqual([[0, 1], [2, 3], [4, 5], [6, 7], [8]]);
    });
    
    test("Successfully checks for group size > length of array", () => {
        expect(chunkItUp([0, 1, 2, 3, 4, 5], 10)).toEqual([[0, 1, 2, 3, 4, 5]]);
        expect(chunkItUp(["a", "b", "c", "d"], 15)).toEqual([["a", "b","c", "d"]]);

    });

    test("Successfully checks for no size specified", () => {
        expect(chunkItUp([0, 1, 2, 3, 4, 5])).toEqual([[0, 1, 2, 3, 4, 5]]);
        expect(chunkItUp(["a", "b", "c", "d"])).toEqual([["a", "b","c", "d"]]);

    });
});

describe('lockDown', () => {
    const sum = function(a, b,c) { return a + (b ?? 0) + (c ?? 0) }
    const secureFunc = lockDown(sum, 'lolol');
    
    const fake = jest.fn();
    const mocked = lockDown(fake, 'pwd');

    
    test("it invokes passed in function only when password is correct", () => {
        mocked('pwd', 2);
        mocked('wrong', 2);
        mocked('hello', 3);
        mocked('pwd', 3);

        expect(secureFunc('lolol', 2)).toBe(2);
        expect(secureFunc('wrong', 2)).toBe(401);

        expect(fake.mock.calls).toEqual([[2], [3]]);
        expect(fake).toHaveBeenCalledTimes(2);
    });
    
    test("it successfully handles multiple inputs", () => {
        fake.mockClear();
        mocked('pwd', 2,3,4);
        mocked('wrong', 2,3,4);
        mocked('hello', 3,4,5);
        mocked('pwd', "hi", "hello", "hola");

        expect(secureFunc('lolol', 1, 2, 3)).toBe(6);
        expect(secureFunc('wrong', 1, 2, 3)).toBe(401);

        expect(fake.mock.calls).toEqual([[2,3,4], ["hi","hello","hola"]]);
        expect(fake).toHaveBeenCalledTimes(2);
    });
});

describe('arrDimensions', () => {
    test("it works and accounts for the outer array", () => {
        expect(arrDimensions( [2, 5, 1] )).toEqual(1);
        expect(arrDimensions( [2, [5], 1] )).toEqual(2);  
        expect(arrDimensions( [2, [5], [3]])).toEqual(2);
        expect(arrDimensions( [2, [5, 4, 5], [3]])).toEqual(2); 
        expect(arrDimensions( [2, [5, [4, 5]], [3]])).toEqual(3); 
        expect(arrDimensions( [2, [5, [4, 5]], [3,1,[2]]])).toEqual(3); 
        expect(arrDimensions( [2, [5], [3, [[16]]], 1] )).toEqual(4); 
        expect(arrDimensions( [2, [5, [4,[5]]], [3, [[[[[10]]]]]], 1] )).toEqual(7); 
    });
    
    test("it handles empty arrays", () => {
        expect(arrDimensions( [] )).toEqual(1);
    });
});

describe('maxBy', () => {
    const nums = [-1, 1, 5, 2, -7]
    const func =  (x) => 2 * x - 1000;
    const func2 = (x) => Math.pow(x, 2);
    const arr = [5];

    test("it returns the array elment leading to the greatest value (not evaluated result)", () => {
        expect(maxBy(nums, Math.abs)).toBe(-7);  
        expect(maxBy(nums,func)).toBe(5);  
        expect(maxBy(arr, func)).toBe(arr[0]);
        expect(maxBy([-1,0,1,2,3,4,5,6,-10], func2)).toBe(-10);
    });
});