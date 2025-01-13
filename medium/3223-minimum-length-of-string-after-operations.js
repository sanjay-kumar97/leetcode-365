/*********************************************************************************************
 *                       Problem: Minimum Length of String After Operations                  *
 *                       --------------------------------------------------                  *
 *                                                                                           *
 * Problem Description:                                                                      *
 * You are given a string `s`. You can perform the following process on `s` any number of    *
 * times:                                                                                    *
 *   - Choose an index `i` in the string such that there is at least one character to the    *
 *     left of index `i` that is equal to `s[i]`, and at least one character to the right    *
 *     that is also equal to `s[i]`.                                                         *
 *   - Delete the closest character to the left of index `i` that is equal to `s[i]`.        *
 *   - Delete the closest character to the right of index `i` that is equal to `s[i]`.       *
 * Return the minimum length of the final string `s` that you can achieve.                   *
 *                                                                                           *
 * Example:                                                                                  *
 *    Input: s = "abaacbcbb"                                                                 *
 *    Output: 5                                                                              *
 *    Explanation: We can perform the following operations:                                  *
 *                 - Choose index 2 ('a'), remove characters at indices 1 and 3, resulting   *
 *                   in "abcbb".                                                             *
 *                 - Choose index 2 ('c'), remove characters at indices 1 and 3, resulting   *
 *                   in "abb".                                                               *
 *                 - Choose index 1 ('b'), remove characters at indices 0 and 2, resulting   *
 *                   in "b".                                                                 *
 *                 The final string length is 1.                                             *
 *********************************************************************************************/

/*********************************************************************************************
 *                                 Brute Force Approach                                      *
 *********************************************************************************************/

var minimumLengthBruteForce = function (s) {
  let len = s.length;

  if (len < 3) return len;

  let result = len,
    frequency = new Map();

  // Count the frequency of each character
  for (let i = 0; i < len; i++) {
    frequency.set(s[i], (frequency.get(s[i]) ?? 0) + 1);
  }

  // Adjust the length by repeatedly removing pairs of characters
  for (let value of frequency.values()) {
    let count = value;
    while (count > 2) {
      result -= 2;
      count -= 2;
    }
  }

  return result;
};

/*********************************************************************************************
 *                                  Optimized Approach                                       *
 *********************************************************************************************/

var minimumLengthEnhanced = function (s) {
  let charFrequency = new Array(26).fill(0);
  let totalLength = 0;

  // Count the frequency of each character in the string
  for (let char of s) {
    charFrequency[char.charCodeAt(0) - "a".charCodeAt(0)]++;
  }

  // Calculate the minimum length after performing the operations
  for (let frequency of charFrequency) {
    if (frequency === 0) continue;
    // If frequency is even, 2 characters remain; if odd, 1 character remains
    totalLength += frequency % 2 === 0 ? 2 : 1;
  }

  return totalLength;
};

/*********************************************************************************************
 *                                 Time and Space Complexity                                 *
 *********************************************************************************************/
/* Brute Force Approach:                                                                
   - Time Complexity: O(n + m), where n is the length of `s` and m is the number of unique 
     characters. Counting frequencies takes O(n), and processing them takes O(m).
   - Space Complexity: O(m), for storing the frequency map.

   Optimized Approach:                                                                  
   - Time Complexity: O(n), where n is the length of `s`. We traverse the string once to 
     count character frequencies and then iterate over a fixed-size array.
   - Space Complexity: O(1), as the frequency array has a fixed size of 26, regardless of 
     the input size.
 *********************************************************************************************/
