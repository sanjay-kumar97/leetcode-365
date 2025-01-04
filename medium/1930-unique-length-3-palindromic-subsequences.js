/*********************************************************************************************
 *                       Problem: Count Unique Palindromic Subsequences                      *
 *                       ----------------------------------------------                      *
 *                                                                                           *
 * Problem Description:                                                                      *
 * Given a string `s`, return the number of unique palindromic subsequences of length 3      *
 * that appear in `s`. A subsequence is a sequence derived from another sequence by          *
 * deleting some or no elements without changing the order of the remaining elements.        *
 *                                                                                           *
 * Example:                                                                                  *
 *    Input: "aabca"                                                                         *
 *    Output: 3                                                                              *
 *    Explanation: The unique palindromic subsequences are: "aaa", "aba", and "aca".         *
 *********************************************************************************************/

/*********************************************************************************************
 *                                 Brute Force Approach                                      *
 *********************************************************************************************/

var countPalindromicSubsequenceBruteForce = function (str) {
  const result = new Set();

  const isValid = (s) => s === s.split('').reverse().join('');

  for (let i = 0; i < str.length - 2; i++) {
    for (let j = i + 1; j < str.length - 1; j++) {
      for (let k = j + 1; k < str.length; k++) {
        let string = str[i] + str[j] + str[k];
        if (isValid(string)) result.add(string);
      }
    }
  }

  return result.size;
};

/*********************************************************************************************
 *                                  Enhanced Approach                                        *
 *********************************************************************************************/

var countPalindromicSubsequenceEnhanced = function (s) {
  const first = new Array(26).fill(-1);
  const last = new Array(26).fill(-1);
  const baseCharCode = 'a'.charCodeAt(0);

  for (let i = 0; i < s.length; i++) {
    let index = s.charCodeAt(i) - baseCharCode;
    if (first[index] === -1) {
      first[index] = i;
    }
    last[index] = i;
  }

  let count = 0;

  for (let i = 0; i < 26; i++) {
    if (first[i] !== -1 && last[i] !== first[i]) {
      const uniqueChars = new Set();
      for (let j = first[i] + 1; j < last[i]; j++) {
        uniqueChars.add(s[j]);
      }
      count += uniqueChars.size;
    }
  }

  return count;
};

/*********************************************************************************************
 *                                 Time and Space Complexity                                 *
 *********************************************************************************************/
/* Brute Force Approach:                                                                    
   - Time Complexity: O(n^3), where n is the length of the string `str`, as it involves 
     three nested loops iterating through the string.
   - Space Complexity: O(k), where k is the number of unique palindromic subsequences, 
     due to the storage in the Set.                                      
 
   Enhanced Approach:                                                                      
   - Time Complexity: O(n + 26 * n) ≈ O(n), as it involves linear scans of the string and 
     processing each character at most once per unique character in the alphabet.
   - Space Complexity: O(26 + k) ≈ O(k), where k is the number of unique palindromic 
     subsequences, with additional fixed space for arrays `first` and `last`.                                    
 *********************************************************************************************/
