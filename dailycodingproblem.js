/* #1 [Easy] 
This problem was recently asked by Google.
Given a list of numbers and a number k, return whether any two numbers from the list add up to k.
For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.
*/

function numbersChecker(list, k) {
    let check = false;
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length; j++) {
            if ((list[i] + list[j] === k) && (list[i] != list[j])) {
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

function productAllLessSelf(arr) {
    let newArr = []
        for (let i = 0; i < arr.length; i++) {
          let multiplier = 1
            for (let j = 0; j < arr.length; j++) {
                if (i != j){
                    multiplier *= arr[j]
                }
            } 
          newArr.push(multiplier)
        }
    return newArr
    }