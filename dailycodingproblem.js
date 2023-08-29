/* #1 [Easy] 
This problem was recently asked by Google.
Given a list of numbers and a number k, return whether any two numbers from the list add up to k.
For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.
*/

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

/* #2 [Hard]
This problem was asked by Uber.
Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.
For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6] 
*/


// Short version:

function productAllLessSelf(arr){
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

class Node {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

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

function getWordsStartedByLongVersion (arr,prefix) {
  let newArr = [];
  for (let i = 0 ; i < arr.length ; i++) {
    if (arr[i].substring(0, prefix.length) === prefix) {
      newArr.push(arr[i]);
    }
  }
  return newArr
}