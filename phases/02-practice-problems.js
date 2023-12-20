function anagrams(str1, str2) {
  let str1Table = {};

  [...str1].forEach((letter) => {
    if (!str1Table[letter]) {
      str1Table[letter] = 1;
    } else {
      str1Table[letter] += 1;
    }
  });

  for (const letter of [...str2]) {
    if (str1Table[letter]) {
      str1Table[letter] -= 1;
    } else {
      return false;
    }
  }

  for (const letter of [...str1]) {
    if (str1Table[letter] !== 0) {
      return false;
    }
  }
  return true;
}

//console.log(anagrams("elvis", "lives")); // => true
//console.log(anagrams("coding", "rocks")); // => false

function commonElements(arr1, arr2) {
  let integersTable = {};

  arr1.forEach((int) => {
    if (!integersTable[int]) {
      integersTable[int] = 1;
    } else {
      integersTable[int] += 1;
    }
  });

  arr2.forEach((int) => {
    if (!integersTable[int]) {
      integersTable[int] = 1;
    } else {
      integersTable[int] += 1;
    }
  });

  return Object.keys(integersTable)
    .filter((key) => integersTable[key] > 1)
    .map((key) => Number(key));
}

//console.log(commonElements([1, 2, 3], [3, 4, 5])); // => [3]
//console.log(commonElements([2, 4, 6], [5, 4, 3, 2, 1])); // => [2,4]

function duplicate(arr) {
  let numTable = {};

  for (const num of arr) {
    if (!numTable[num]) {
      numTable[num] = 1;
    } else {
      return num;
    }
  }
}

// console.log(duplicate([2, 2, 1])); // => 2
// console.log(duplicate([7, 2, 4, 9, 5, 4, 8])); // => 4

function twoSum(nums, target) {
  let numSet = new Set();

  for (const num of nums) {
    numSet.add(num);
    if (numSet.has(target - num) && target - num !== num) {
      return true;
    }
  }
  return false;
}

// console.log(twoSum([2, 7, 11, 15], 22)); // => true
// console.log(twoSum([3, 4, 5], 6)); // => false

function wordPattern(pattern, strings) {
  let patternTable = {};
  let stringSet = new Set();

  for (let i = 0; i < pattern.length; i++) {
    let patternLetter = pattern[i];
    let string = strings[i];

    if (stringSet.has(string)) {
      if (patternTable[patternLetter] !== string) {
        return false;
      }
    } else {
      patternTable[patternLetter] = string;
      stringSet.add(string);
    }
  }
  return true;
}

// console.log(wordPattern("ABBA", ["dog", "cat", "cat", "dog"])); // => true
// console.log(wordPattern("ABBA", ["dog", "dog", "dog", "dog"])); // => false
// console.log(wordPattern("AAAA", ["dog", "dog", "dog", "dog"])); // => true
// console.log(wordPattern("ABCD", ["dog", "cat", "dog", "cat"])); // => false
module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
