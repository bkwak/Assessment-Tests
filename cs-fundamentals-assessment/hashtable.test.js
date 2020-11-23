const {HashTable, hashCode} = require('../src/main.js');

const ht = new HashTable();

ht.set("codesmith", true);
ht.set("Los Angeles", "the best");
ht.set("juniors", 36);
ht.set("january", {});   //will be same hash as juniors
ht.set("seniors", null);

describe("Set Method", () => {

    test("it uses hashCode to generate a hash key", () => {

    });

    test("it uses either an object or a linked list to handle collisions", () => {
        const index = hashCode("codesmith", ht.SIZE);
        expect(typeof ht.storage[index]).toBe("object")
        expect(typeof ht.storage[index]).not.toBe("string")
    });

    test("it does not overwrite values with the same hash key", () => {
        const index = hashCode("juniors", ht.SIZE);

        expect(typeof ht.storage[index]).toBe("object")
        expect(ht.storage[index]).toHaveProperty("january");
        expect(ht.storage[index]).toHaveProperty("juniors");

    });
});

describe("Get Method", () => {

    test("it uses hashCode to generate a hash key", () => {

    });

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
    const returned = ht.remove("january");

    test("it uses hashCode to generate a hash key", () => {

    });

    test("Deletes appropriate value set at hash key and original key", () => {
        const index = hashCode("juniors", ht.SIZE);

        expect(typeof ht.storage[index]).toBe("object")
        expect(ht.storage[index]).toHaveProperty("january");
        expect(ht.storage[index]).not.toHaveProperty("juniors");
    });

    test("it returns deleted value", () => {
        expect(returned).toEqual({});
        expect(ht.remove("codesmith")).toBe(true);
        expect(ht.remove("juniors")).toBe(36)
    });
    
    test("it accounts for value not existing", () => {
        expect(ht.remove("indiana jones")).toBe(undefined);
    });

});

describe("Extension", () => {
    //hash table will have 12 items in storage
    const htExtension = new HashTable();
    for (let i = 0; i <= 12; i += 1) {
        htExtension.set(`a${i}`, i);
    }
    const originalIndex = hashCode("a10", htExtension.SIZE);

    describe("Set Method", () => {
        //adding one more item should double the storage size
        const originalSize = htExtension.SIZE;
        htExtension.set("a13", 13);

        test("if current length is at 75% capacity of size property, it doubles the size", () => {
            expect(htExtension.SIZE).toBe(originalSize * 2);
        });

        test("it rehash every element with new this.SIZE", () => {
            newIndex = hashCode("a10", htExtension.SIZE);
            
            expect(oldIndex).not.toBe(newIndex);
            expect(htExtension.storage[originalIndex]).not.toHaveProperty("a10");
            expect(htExtension.storage[newIndex]).toHaveProperty("a10");
        });

    });

    describe("Remove Method", () => {
        //hash table has 13 items, so need to remove 5 to bring to a total of 8 items in storage
        for (let i = 13; i >= 9; i -= 1) {
            htExtension.remove(`a${i}`);
        }
        const previSize = htExtension.SIZE;
        const prevIndex = hashCode("a6", htExtension.SIZE);
        //removing one more should trigger size to be halved
        htExtension.remove('a8');

        test("If current SIZE is greater than 16 & length is at 25% capacity of size property, halve the size", () => {
            expect(htExtension.SIZE).toBe(previousSize / 2);
        });

        test("it rehash every element with new this.SIZE", () => {
            newIndex = hashCode("a6", htExtension.SIZE);
            
            expect(oldIndex).not.toBe(newIndex);
            expect(htExtension.storage[originalIndex]).not.toHaveProperty("a6");
            expect(htExtension.storage[newIndex]).toHaveProperty("a6");
        });

    });
});