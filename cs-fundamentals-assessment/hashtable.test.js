/**
 * ************************************
 * @module  cs-fundamentals-test
 * @author  Ben/ bkwak
 * @date    12/14/20 
 * @description For the tests to work you have to make the following changes to the students' files:
 *     In main.js, 
 *          - modify the export statement at the end to read: 
 *            module.exports = { HashTable, hashCode };
 * ************************************
 */

//you may have to adjust the file paths
const {HashTable, hashCode} = require('../src/main.js');
const HashTableExt = require('../src/extension.js');

const ht = new HashTable();

ht.set("codesmith", true);
ht.set("Los Angeles", "the best");
ht.set("juniors", 36);
ht.set("junior", 11);
ht.set("january", {});   //will be same hash as juniors
ht.set("seniors", null);

//FOR EXTENSION
//hash table will have 12 items in storage
const htExtension = new HashTableExt();
for (let i = 0; i <= 11; i += 1) {
    htExtension.set(`a${i}`, i);
}
const originalIndex = hashCode("a2", htExtension.SIZE);
const originalSize = htExtension.SIZE;
let prevIndex;

describe("Set Method", () => {

    test("it uses either an object or a linked list to handle collisions", () => {
        const index = hashCode("codesmith", ht.SIZE);
        expect(typeof ht.storage[index]).toBe("object")
        expect(typeof ht.storage[index]).not.toBe("string")
    });

    test("it does not overwrite values with the same hash key", () => {
        const index = hashCode("juniors", ht.SIZE);

        expect(typeof ht.storage[index]).toBe("object")
        expect(ht.storage[index]).toHaveProperty("january", {});
        expect(ht.storage[index]).toHaveProperty("juniors", 36);
    });
});

describe("Get Method", () => {

    test("it works", () => {
        expect(ht.get("codesmith")).toBe(true);
        expect(ht.get("juniors")).toBe(36);
        expect(ht.get("Los Angeles")).toBe("the best");
    });

    test("it returns undefined for keys that aren't in the hash table", () => {
        expect(ht.get("asdfghjkuytr")).toBe(undefined);
    });

});

describe("Remove Method", () => {
    
    test("Deletes appropriate value set at hash key and original key", () => {
        const index = hashCode("juniors", ht.SIZE);
        const returned = ht.remove("january");
        
        expect(typeof ht.storage[index]).toBe("object")
        expect(ht.storage[index]).not.toHaveProperty("january");
        expect(ht.storage[index]).toHaveProperty("juniors");
        expect(returned).toEqual({});
    });

    test("it returns deleted value", () => {
        expect(ht.remove("codesmith")).toBe(true);
        expect(ht.remove("juniors")).toBe(36)
    });
    
    test("it accounts for value not existing", () => {
        expect(ht.remove("indiana jones")).toBe(undefined);
    });

});

describe("Extension", () => {
    
    describe("Set Method", () => {     
        test("if current length is at 75% capacity of size property, it doubles the size", () => {
            //adding one more item should double the storage size
            htExtension.set("a11", 11);
            expect(htExtension.SIZE).toBe(originalSize * 2);
        });

        test("it rehash every element with new this.SIZE", () => {
            newIndex = hashCode("a2", htExtension.SIZE);
            expect(originalIndex).not.toBe(newIndex);
            expect(htExtension.storage[originalIndex]).not.toHaveProperty("a2");
            expect(htExtension.storage[newIndex]).toHaveProperty("a2");
        });

    });

    describe("Remove Method", () => {
        test("If current SIZE is greater than 16 & length is at 25% capacity of size property, halve the size", () => {
            //hash table has 13 items, so need to remove 5 to bring to a total of 8 items in storage
            const prevSize = htExtension.SIZE;
            prevIndex = hashCode("a5", htExtension.SIZE);
            for (let i = 13; i >= 8; i -= 1) {
                htExtension.remove(`a${i}`);
            }
            //removing one more should trigger size to be halved
            htExtension.remove('a7');
            expect(htExtension.SIZE).toBe(prevSize / 2);
        });

        test("it rehash every element with new this.SIZE", () => {
            newIndex = hashCode("a5", htExtension.SIZE);
            
            expect(prevIndex).not.toBe(newIndex);
            if(prevIndex < htExtension.size) expect(htExtension.storage[prevIndex]).not.toHaveProperty("a5");
            expect(htExtension.storage[newIndex]).toHaveProperty("a5");
        });

    });
});