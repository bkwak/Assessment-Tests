const BST = require('../part-2/main.js');

const emptyBST = new BST(50);
  
const bst = new BST(50);
bst.add(75);
bst.add(25);
bst.add(37);
bst.add(63);
bst.add(87);
bst.add(13);
bst.add(70);

/*
bst should look like this:
         50
       /    \
     25      63
    /  \       \ 
  13    37      87
                /
               70 
*/
  
describe("Add Method", () => {

    test("it has an add method", () => {
        expect(emptyBST.add).toBeDefined();
        expect(emptyBST.add).toBeInstanceOf(Function);
    })

    test("it creates a new node in the correct position based on the value of the current node", () => {
        const leftBST = new BST(50);
        leftBST.add(24);
        
        const rightBST = new BST(50);
        rightBST.add(76);
        
        const largeBST = new BST(50);
        for (let i = 51; i <= 58; i++) {
            largeBST.add(i);
        }
        for (let i = 49; i >= 42; i--) {
            largeBST.add(i);
        }

        expect(leftBST.left.value).toBe(24);
        expect(leftBST.right).toBeNull();  
        expect(rightBST.right.value).toBe(76);
        expect(rightBST.left).toBeNull();
        expect(bst.right.value).toBe(75);
        expect(bst.right.right.value).toBe(87);
        expect(bst.right.left.value).toBe(63);
        expect(bst.left.value).toBe(25);
        expect(bst.left.left.value).toBe(13);
        expect(bst.left.right.value).toBe(37);
        expect(bst.right.right.left.value).toBe(70);

        expect(largeBST.value).toBe(50);
        expect(largeBST.right.value).toBe(51);
        expect(largeBST.right.right.value).toBe(52);
        expect(largeBST.right.right.right.value).toBe(53);
        expect(largeBST.right.right.right.right.value).toBe(54);
        expect(largeBST.right.right.right.right.right.value).toBe(55);
        expect(largeBST.right.right.right.right.right.right.value).toBe(56);
        expect(largeBST.right.right.right.right.right.right.right.value).toBe(57);
        expect(largeBST.right.right.right.right.right.right.right.right.value).toBe(58);
        expect(largeBST.left.value).toBe(49);
        expect(largeBST.left.left.value).toBe(48);
        expect(largeBST.left.left.left.value).toBe(47);
        expect(largeBST.left.left.left.left.value).toBe(46);
        expect(largeBST.left.left.left.left.left.value).toBe(45);
        expect(largeBST.left.left.left.left.left.left.value).toBe(44);
        expect(largeBST.left.left.left.left.left.left.left.value).toBe(43);
        expect(largeBST.left.left.left.left.left.left.left.left.value).toBe(42);
    });
});

describe("Contains Method", () => {

    test("it has a contains method", () => {
        expect(emptyBST.contains).toBeDefined();
        expect(emptyBST.contains).toBeInstanceOf(Function);
    });

    test("it searches for nodes in correct direction based on value of current node", () => {
        expect(bst.contains(13)).toBe(true);
        expect(bst.contains(25)).toBe(true);
        expect(bst.contains(87)).toBe(true);
        expect(bst.contains(75)).toBe(true);
        expect(bst.contains(70)).toBe(true);

    });

    test("it accounts for when there is no tree", () => {
        expect(emptyBST.contains(13)).not.toBeUndefined();
        expect(emptyBST.contains(13)).toBe(false);
        expect(emptyBST.contains(50)).not.toBeUndefined();
        expect(emptyBST.contains(50)).toBe(true);
    });

    test("it accounts for when the value can't be found", () => {
        expect(bst.contains(10)).not.toBeUndefined();
        expect(bst.contains(10)).toBe(false);
        expect(bst.contains(90)).not.toBeUndefined();
        expect(bst.contains(90)).toBe(false);
    });
    
});

