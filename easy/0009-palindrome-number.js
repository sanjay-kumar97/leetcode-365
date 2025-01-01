/*********************************************************************************************
 *                                Problem: Palindrome Number                                 *
 *                                --------------------------                                 *
 *                                                                                           *
 * Problem Description: Given an integer x, return true if x is a palindrome, and false      *
 *                      otherwise.                                                           *
 * Example:                                                                                  *
 *    Input: x = 121                                                                         *
 *    Output: true                                                                           *
 *    Input: x = -121                                                                        *
 *    Output: false                                                                          *
 *********************************************************************************************/

/*********************************************************************************************
 *                                 Brute Force Approach                                      *
 *********************************************************************************************/

var isPalindromeBruteForce = function (x) {
    const str = x.toString();
    return str === str.split('').reverse().join('');
};

/*********************************************************************************************
 *                                  Enhanced Approach                                        *
 *********************************************************************************************/

var isPalindromeEnhanced = function (x) {
    if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

    let reversed = 0;
    while (x > reversed) {
        reversed = reversed * 10 + (x % 10);
        x = Math.floor(x / 10);
    }

    return x === reversed || x === Math.floor(reversed / 10);
};

/*********************************************************************************************
 *                                 Time and Space Complexity                                 *
 *********************************************************************************************/
/* Brute Force Approach:                                                                    
   - Time Complexity: O(n)                          
   - Space Complexity: O(n)                                   
 
   Enhanced Approach:                                                                      
   - Time Complexity: O(log n)                      
   - Space Complexity: O(1)          
 *********************************************************************************************/
