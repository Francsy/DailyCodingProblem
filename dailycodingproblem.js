/* #1 [Easy] --------------------------------------------------------------
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

/* #2 [Hard] --------------------------------------------------------------
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

/* #3 [Medium] --------------------------------------------------------------
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


/* #4 [Hard] --------------------------------------------------------------
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


/* #5 [Medium] --------------------------------------------------------------
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

/* #6 [Hard] --------------------------------------------------------------
This problem was asked by Google. An XOR linked list is a more memory efficient doubly linked list. Instead of each node holding next and prev fields, it holds a field named both, which is an XOR of the next node and the previous node. Implement an XOR linked list; it has an add(element) which adds the element to the end, and a get(index) which returns the node at index. If using a language that has no pointers (such as Python), you can assume you have access to get_pointer and dereference_pointer functions that converts between nodes and memory addresses.
(Not proper solution in JS due to the language's limitations)
*/

/* #7 [Medium] --------------------------------------------------------------
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

/* #8 [Easy] --------------------------------------------------------------
This problem was asked by Google.

A unival tree (which stands for "universal value") is a tree where all nodes under it have the same value.

Given the root to a binary tree, count the number of unival subtrees.

For example, the following tree has 5 unival subtrees:

   0
  / \
 1   0
    / \
   1   0
  / \
 1   1
*/

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

const univalSubCount = root => {
    if (root === null) { // Null nodes returns 0 since they doesn´t exist
        return 0
    }
    let count = 0;
    if ((!root.left || root.left.val === root.val) && (!root.right || root.right.val === root.val)) {
        count++ // If there is no subnodes or the subnodes has the same value it is unival
    }
    count += univalSubCount(root.left); // We pass the function to the subtrees to iterate the entire tree
    count += univalSubCount(root.right);
    return count;
}

/* 
Testing:

const root = new TreeNode(0);
root.left = new TreeNode(1);
root.right = new TreeNode(0);
root.right.left = new TreeNode(1);
root.right.right = new TreeNode(0);
root.right.left.left = new TreeNode(1);
root.right.left.right = new TreeNode(1);

univalSubCount(root); // output: 5
*/

/* #9 [Hard] --------------------------------------------------------------

This problem was asked by Airbnb.

Given a list of integers, write a function that returns the largest sum of non-adjacent numbers. Numbers can be 0 or negative.

For example, [2, 4, 6, 2, 5] should return 13, since we pick 2, 6, and 5. [5, 1, 1, 5] should return 10, since we pick 5 and 5.

Follow-up: Can you do this in O(N) time and constant space?
*/

const nonAdjacentMaxSum = (arr) => {
    let prevSum = 0;
    let currentSum = 0;

    for (let i = 0; i < arr.length; i++) {
        const newSum = Math.max(currentSum, prevSum + arr[i]);
        prevSum = currentSum;
        currentSum = newSum;
    }
    return currentSum;
}



/* #10 [Medium] --------------------------------------------------------------

This problem was asked by Apple.

Implement a job scheduler which takes in a function f and an integer n, and calls f after n milliseconds.

*/

const jobScheduler = (f, n) => {
    setTimeout(() => {
        f();
    }, n);
}

/* #11 [Medium] --------------------------------------------------------------
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

/* #12 [Hard] --------------------------------------------------------------

This problem was asked by Amazon.

There exists a staircase with N steps, and you can climb up either 1 or 2 steps at a time. Given N, write a function that returns the number of unique ways you can climb the staircase. The order of the steps matters.

For example, if N is 4, then there are 5 unique ways:

1, 1, 1, 1
2, 1, 1
1, 2, 1
1, 1, 2
2, 2
What if, instead of being able to climb 1 or 2 steps at a time, you could climb any number from a set of positive integers X? For example, if X = {1, 3, 5}, you could climb 1, 3, or 5 steps at a time.

*/

const countWaysToClimb = (N) => {
    const dp = new Array(N + 1).fill(0)
    dp[0] = 1;
    dp[1] = 1;
    for (let i = 2; i <= N; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[N];
}

/* #13 [Hard] --------------------------------------------------------------
This problem was asked by Amazon.

Given an integer k and a string s, find the length of the longest substring that contains at most k distinct characters.

For example, given s = "abcba" and k = 2, the longest substring with k distinct characters is "bcb".
*/

/* #14 [Medium] --------------------------------------------------------------
This problem was asked by Google.

The area of a circle is defined as πr^2. Estimate π to 3 decimal places using a Monte Carlo method.

Hint: The basic equation of a circle is x2 + y2 = r2.
*/


const estimatePi = random => {
    let inside = 0;

    for (let i = 0; i < random; i++) {
        const x = Math.random(); // X-coordinate between 0 and 1
        const y = Math.random(); // y-coordinate between 0 and 1

        // Check if that random point is inside the circle (x^2 + y^2 <= 1)
        if (x * x + y * y <= 1) {
            inside++;
        }
    }

    // Estimate π as 4 times the ratio of points inside the circle to the total points
    const estimatedPi = (inside / random) * 4;

    return estimatedPi.toFixed(3);
}



/* #15 [Medium] --------------------------------------------------------------
This problem was asked by Facebook.

Given a stream of elements too large to store in memory, pick a random element from the stream with uniform probability.
*/

const getRandomElement = stream => {
    let selectedElement = null;
    let counter = 0;

    for (const element of stream) {
        counter++;
        console.log(counter);
        if (counter === 1) {
            selectedElement = element;
        } else {
            let random = Math.floor(Math.random() * counter)
            random === 0 ? selectedElement = element : null; // In every iteration every element will have the chance to get the 0.
        }
    }
    return selectedElement;
}
/* #16 [Easy]
This problem was asked by Twitter.

You run an e-commerce website and want to record the last N order ids in a log. Implement a data structure to accomplish this, with the following API:

record(order_id): adds the order_id to the log
get_last(i): gets the ith last element from the log. i is guaranteed to be smaller than or equal to N.
You should be as efficient with time and space as possible.
*/

class orderLog {
    constructor(N) {
        this.N = N;
        this.log = [];
    }

    record(orderID) {
        this.log.push(orderID);
        if (this.log.length > this.N) {
            this.log.shift();
        }
    }
    getLast(i) {
        return this.log[this.log.length - i]
    }
}


/* #17 [Hard]
This problem was asked by Google.

Suppose we represent our file system by a string in the following manner:

The string "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext" represents:

dir
    subdir1
    subdir2
        file.ext
The directory dir contains an empty sub-directory subdir1 and a sub-directory subdir2 containing a file file.ext.

The string "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext" represents:

dir
    subdir1
        file1.ext
        subsubdir1
    subdir2
        subsubdir2
            file2.ext
The directory dir contains two sub-directories subdir1 and subdir2. subdir1 contains a file file1.ext and an empty second-level sub-directory subsubdir1. subdir2 contains a second-level sub-directory subsubdir2 containing a file file2.ext.

We are interested in finding the longest (number of characters) absolute path to a file within our file system. For example, in the second example above, the longest absolute path is "dir/subdir2/subsubdir2/file2.ext", and its length is 32 (not including the double quotes).

Given a string representing the file system in the above format, return the length of the longest absolute path to a file in the abstracted file system. If there is no file in the system, return 0.

Note:

The name of a file contains at least a period and an extension.

The name of a directory or sub-directory will not contain a period.

*/


/* #18 [Hard]

This problem was asked by Google.

Given an array of integers and a number k, where 1 <= k <= length of the array, compute the maximum values of each subarray of length k.

For example, given array = [10, 5, 2, 7, 8, 7] and k = 3, we should get: [10, 7, 8, 8], since:

10 = max(10, 5, 2)
7 = max(5, 2, 7)
8 = max(2, 7, 8)
8 = max(7, 8, 7)
Do this in O(n) time and O(k) space. You can modify the input array in-place and you do not need to store the results. You can simply print them out as you compute them.

*/


/* #21 [Easy] --------------------------------------------------------------
This problem was asked by Snapchat.

Given an array of time intervals (start, end) for classroom lectures (possibly overlapping), find the minimum number of rooms required.

For example, given [[30, 75], [0, 50], [60, 150]], you should return 2.
*/

const requiredRoomsCounter = (arr) => {
    let classIntervals = []; // We´ll create an objects array with all times and types (start, end)
    for (const [start, end] of arr) {
        classIntervals.push({ time: start, type: 'start' })
        classIntervals.push({ time: end, type: 'end' })
    }

    classIntervals.sort((a, b) => { // Order all times to track what will happen step by step
        if (a.time !== b.time) {
            return a.time - b.time;
        }
    });

    let currentRooms = 0;
    let maxRooms = 0;

    for (const interval of classIntervals) {
        if (interval.type === 'start') {
            currentRooms++ // Each 'start' adds a classroom 
            maxRooms = Math.max(currentRooms, maxRooms); // When a room is added, we need to check if we exceed the maximum number of rooms required, and reassign if so
        } else {
            currentRooms-- // Each 'end' releases a classroom
        }
    }
    return maxRooms;
}

