/*********************************************************************************************
 *                              Problem: Construct K Palindrome Strings                      *
 *                              ---------------------------------------                      *
 *                                                                                           *
 * Problem Description:                                                                      *
 * Given a string `s` and an integer `k`, return `true` if you can construct `k` palindrome  *
 * strings using all the characters in `s`. Otherwise, return `false`. A palindrome is a     *
 * string that reads the same forward and backward. Each character in `s` must be used       *
 * exactly once in one of the strings.                                                       *
 *                                                                                           *
 * Example:                                                                                  *
 *    Input: s = "annabelle", k = 2                                                          *
 *    Output: true                                                                           *
 *    Explanation: You can construct two palindromes using "anna" and "belle".               *
 *********************************************************************************************/

/*********************************************************************************************
 *                                 Brute Force Approach                                      *
 *********************************************************************************************/

var canConstructBruteForce = function (s, k) {
  if (s.length < k) return false; // Not enough characters
  if (s.length === k) return true; // Each character can form a single palindrome

  const frequency = new Array(26).fill(0);
  let oddCount = 0;

  // Count frequency of each character
  for (let c of s) {
    frequency[c.charCodeAt(0) - "a".charCodeAt(0)]++;
  }

  // Count characters with odd frequency
  for (let count of frequency) {
    if (count % 2 === 1) oddCount++;
  }

  // The number of palindromes we need must be greater than or equal to oddCount
  return oddCount <= k;
};

/*********************************************************************************************
 *                                 Bit Manipulation Approach                                 *
 *********************************************************************************************/

var canConstructEnhanced = function (s, k) {
  if (s.length < k) return false; // Not enough characters
  if (s.length === k) return true; // Each character can form a single palindrome

  let oddCount = 0;

  // Use bit manipulation to count odd frequency characters
  for (let i = 0; i < s.length; i++) {
    oddCount ^= 1 << (s.charCodeAt(i) - "a".charCodeAt(0));
  }

  // Count the number of set bits in oddCount (i.e., odd frequency characters)
  return [...oddCount.toString(2)].filter((bit) => bit === "1").length <= k;
};

/*********************************************************************************************
 *                                 Time and Space Complexity                                 *
 *********************************************************************************************/
/* Brute Force Approach:                                                                
   - Time Complexity: O(n + 26), where n is the length of `s`. We traverse the string to 
     calculate frequencies and iterate over the frequency array (of fixed size 26).
   - Space Complexity: O(26), for the frequency array.

   Enhanced Approach:                                                                  
   - Time Complexity: O(n), where n is the length of `s`. Bitwise operations are performed in
     constant time, and we iterate through the string once.
   - Space Complexity: O(1), as we only use a few variables.
 *********************************************************************************************/
