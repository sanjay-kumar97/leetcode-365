/*********************************************************************************************
 *                      Problem: Check if a Parentheses String Can Be Valid                  *
 *                      ---------------------------------------------------                  *
 *                                                                                           *
 * Problem Description:                                                                      *
 * A parentheses string is valid if and only if:                                             *
 *   - It is the empty string, or                                                            *
 *   - It can be written as AB (A concatenated with B), where A and B are valid strings, or  *
 *   - It can be written as (A), where A is a valid string.                                  *
 *                                                                                           *
 * You are given a string `s` containing only '(' and ')' and a string `locked` containing   *
 * only '0' and '1'. A '0' means the character at that position is unlocked, and can be      *
 * turned into either '(' or ')'. A '1' means the character is locked and cannot be changed. *
 *                                                                                           *
 * Return true if `s` can be made valid, otherwise return false.                             *
 *                                                                                           *
 * Example:                                                                                  *
 *    Input: s = "))()))", locked = "010100"                                                 *
 *    Output: true                                                                           *
 *********************************************************************************************/

/*********************************************************************************************
 *                                 Brute Force Approach                                      *
 *********************************************************************************************/

// A brute force approach would involve generating all possible variations of the string `s`
// by substituting unlocked characters ('0' in `locked`) with either '(' or ')', and checking
// if any of the combinations is valid. However, this is computationally expensive and 
//impractical.

/*********************************************************************************************
 *                                  Optimized Approach                                       *
 *********************************************************************************************/

var canBeValid = function (s, locked) {
    const stringLength = s.length;

    // A valid parentheses string must have an even number of characters.
    if (stringLength % 2 === 1) return false;

    const openIndices = [], unlockedIndices = [];

    for (let i = 0; i < stringLength; i++) {
        if (locked[i] === '0') {
            // Unlocked character can be adjusted later
            unlockedIndices.push(i);
        } else if (s[i] === '(') {
            // Push open parenthesis index onto the stack
            openIndices.push(i);
        } else if (s[i] === ')') {
            if (openIndices.length > 0) {
                // Match a locked '('
                openIndices.pop();
            } else if (unlockedIndices.length > 0) {
                // Use an unlocked index to balance ')'
                unlockedIndices.pop();
            } else {
                return false;
            }
        }
    }

    // Use remaining unlocked indices to balance unmatched '('
    while (openIndices.length > 0 && unlockedIndices.length > 0 &&
        openIndices[openIndices.length - 1] < unlockedIndices[unlockedIndices.length - 1]) {
        openIndices.pop();
        unlockedIndices.pop();
    }

    // The string is valid if there are no unmatched '(' and the remaining unlocked
    // indices can form valid pairs.
    return openIndices.length === 0 && unlockedIndices.length % 2 === 0;
};

/*********************************************************************************************
 *                                 Time and Space Complexity                                 *
 *********************************************************************************************/
/* Brute Force Approach:                                                                
   - Time Complexity: O(2^n), where n is the number of unlocked characters. For each unlocked 
     character, we have two choices ('(' or ')').
   - Space Complexity: O(n), for storing intermediate results during recursion.

   Optimized Approach:                                                                  
   - Time Complexity: O(n), where n is the length of `s`. We traverse the string once and 
     perform constant-time operations for each character.
   - Space Complexity: O(n), for storing indices of open and unlocked parentheses.
 *********************************************************************************************/
