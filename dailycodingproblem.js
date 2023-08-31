/* #1 [Easy] 
This problem was recently asked by Google.

Given a list of numbers and a number k, return whether any two numbers from the list add up to k.
For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.
*/

// First version (nested loop)

function numbersChecker(list, k) {
    let check = false;
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length; j++) {
            if ((list[i] + list[j] === k) && (i !== j)) {
                check = true;
            }
        }
    }
    return check
}

// Second version (one loop)

function numbersChecker2V(list, k) {
    const checkedNumbers = [];
    for (const num of list) {
        const complement = k - num;
        if (checkedNumbers.includes(complement)) {
            return true;
        }
        checkedNumbers.push(num);
    }
    return false;
}

// Third version (using Set)

function numbersChecker3V(list, k) {
    const numberSet = new Set();
    for (const num of list) {
        const complement = k - num;
        if (numberSet.has(complement)) {
            return true;
        }
        numberSet.add(num);
    }
    return false;
}

/* #2 [Hard]
This problem was asked by Uber.

Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.
For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6] 
*/

// Short version:

function productAllLessSelf(arr) {
    const totalArrProduct = arr.reduce((acc, num) => acc * num);
    return arr.map(num => totalArrProduct / num);
}

// Long version:

function productAllLessSelfLongVersion(arr) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        let multiplier = 1
        for (let j = 0; j < arr.length; j++) {
            if (i != j) {
                multiplier *= arr[j]
            }
        }
        newArr.push(multiplier);
    }
    return newArr
}

/* #3 [Medium]
This problem was asked by Google.

Given the root to a binary tree, implement serialize(root), which serializes the tree into a string, and deserialize(s), which deserializes the string back into the tree.
For example, given the following Node class

class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

The following test should pass:

node = Node('root', Node('left', Node('left.left')), Node('right'))
assert deserialize(serialize(node)).left.left.val == 'left.left'
 */

// The exercise is written in Python, we will translate it to JS.

class Node {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

const serialize = root => {
    if (!root) {
        return null;
    }
    return JSON.stringify({
        val: root.val,
        left: serialize(root.left),
        right: serialize(root.right),
    })
}

const deserialize = string => {
    if (!string) {
        return null;
    }
    const node = JSON.parse(string);
    const left = deserialize(node.left);
    const right = deserialize(node.right);
    return new Node(node.val, left, right);
}

/* Testing:

const tree = new Node("root", new Node("left", new Node("left.left")), new Node("right"));

const serializedTree = serialize(tree);
const deserializeTree = deserialize(serializedTree); 
console.log(deserializeTree.left.left.val); // Output: 'left.left'

*/


/* #4 [Hard]
This problem was asked by Stripe.

Given an array of integers, find the first missing positive integer in linear time and constant space. In other words, find the lowest positive integer that does not exist in the array. The array can contain duplicates and negative numbers as well.

For example, the input [3, 4, -1, 1] should give 2. The input [1, 2, 0] should give 3.

You can modify the input array in-place.
*/

const positiveMissingNumFinder = (arr) => {

    // Order numbers, remove numbers the not positive integers ones and repeated ones for a proper comparison:

    const simplifiedArr = arr.sort((a, b) => a - b).filter((num, i, arr) => arr.indexOf(num) === i && num >= 0)

    // I iterate through the array up to one more than its length in case no number is missing from the array, in which case it will be the next one:

    for (i = 0; i <= simplifiedArr.length; i++) {
        if (simplifiedArr[i] !== i + 1) {
            return i + 1
        }
    }
}

// No built-in methods version:

const positiveMissingNumFinderV2 = (arr) => {

    // Separate positive numbers and place them in their correct positions
    for (let i = 0; i < arr.length; i++) {
        while (arr[i] > 0 && arr[arr[i] - 1] !== arr[i]) {
            [arr[arr[i] - 1], arr[i]] = [arr[i], arr[arr[i] - 1]];
        }
    }

    // Find the first missing positive number
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== i + 1) {
            return i + 1;
        }
    }
    // If there is no missing positive number between the arr then it is the next one:
    return arr.length + 1;
};


/* #5 [Medium]
This problem was asked by Jane Street.

cons(a, b) constructs a pair, and car(pair) and cdr(pair) returns the first and last element of that pair. For example, car(cons(3, 4)) returns 3, and cdr(cons(3, 4)) returns 4.

Given this implementation of cons:

def cons(a, b):
    def pair(f):
        return f(a, b)
    return pair
Implement car and cdr.

*/

function cons(a, b) {
    function pair(f) {
        return f(a, b)
    }
    return pair
}

function car(pair) {
    return pair(function (a, b) {
        return a
    })
}

function cdr(pair) {
    return pair(function (a, b) {
        return b
    })
}

/* #7 [Medium]
This problem was asked by Facebook.

Given the mapping a = 1, b = 2, ... z = 26, and an encoded message, count the number of ways it can be decoded.

For example, the message '111' would give 3, since it could be decoded as 'aaa', 'ka', and 'ak'.

You can assume that the messages are decodable. For example, '001' is not allowed.

*/

function countDecodingWays(message) {
    let numDigits = message.length;
  
    let counterArr = new Array(numDigits + 1).fill(0); // New arr where we´ll store the numbers of ways to decode in every iteration
    counterArr[0] = 1; //We start with at least one way to decode
    
    for (let i = 1; i <= numDigits; i++) {   // Iterate over the characters in the message starting at the second one.
      // Add to counterArr position the previous number and check if there are more ways to do it
      counterArr[i] = counterArr[i - 1] + (i >= 2 && Number(message[i - 2] + message[i - 1]) >= 10 && Number(message[i - 2] + message[i - 1]) <= 26 ? counterArr[i - 2] : 0);
      console.log(counterArr)
    }
    // Return the value of last value in the counterArr
    return counterArr[numDigits];
  }


/* #11 [Medium]
This problem was asked by Twitter.
Implement an autocomplete system. That is, given a query string s and a set of all possible query strings, return all strings in the set that have s as a prefix.
For example, given the query string de and the set of strings [dog, deer, deal], return [deer, deal].
Hint: Try preprocessing the dictionary into a more efficient data structure to speed up queries.
*/

//short version:

const getWordsStartedBy = (arr, prefix) => arr.filter(word => word.substring(0, prefix.length) === prefix);

//long version:

function getWordsStartedByLongVersion(arr, prefix) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].substring(0, prefix.length) === prefix) {
            newArr.push(arr[i]);
        }
    }
    return newArr
}