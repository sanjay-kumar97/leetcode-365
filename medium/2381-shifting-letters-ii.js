/*********************************************************************************************
 *                                   Problem: Shifting Letters II                            *
 *                                   ----------------------------                            *
 *                                                                                           *
 * Problem Description:                                                                      *
 * You are given a string `s` and a 2D array `shifts`, where each shift operation is         *
 * represented as an array `[start, end, direction]`. Perform the following operations:      *
 * - For each `[start, end, direction]`:                                                     *
 *    - `start` and `end` are indices (inclusive) of the substring of `s` to be shifted.     *
 *    - `direction` is `1` for shifting forward (next character in the alphabet, wrap        *
 *      around after 'z'), or `0` for shifting backward (previous character, wrap around     *
 *      before 'a').                                                                         *
 * Return the modified string after applying all the shift operations.                       *
 *                                                                                           *
 * Example:                                                                                  *
 *    Input:                                                                                 *
 *      s = "abc"                                                                            *
 *      shifts = [[0, 1, 1], [1, 2, 0]]                                                      *
 *    Output:                                                                                *
 *      "acc"                                                                                *
 *********************************************************************************************/

/*********************************************************************************************
 *                                 Brute Force Approach                                      *
 *********************************************************************************************/

var shiftingLettersBruteForce = function (s, shifts) {
    const first = 97, last = 122; // ASCII range for 'a' to 'z'
    let ascii = Array.from(s).map(char => char.charCodeAt(0));

    for (let [start, end, direction] of shifts) {
        for (let i = start; i <= end; i++) {
            if (direction === 1) { // Forward shift
                ascii[i] = ascii[i] < last ? ascii[i] + 1 : first;
            } else { // Backward shift
                ascii[i] = ascii[i] > first ? ascii[i] - 1 : last;
            }
        }
    }

    return ascii.map(code => String.fromCharCode(code)).join('');
};

/*********************************************************************************************
 *                                  Enhanced Approach                                        *
 *********************************************************************************************/

var shiftingLettersEnhanced = function (s, shifts) {
    const n = s.length;
    const diffArray = new Array(n).fill(0);

    // Apply shifts to the difference array
    for (let [start, end, direction] of shifts) {
        if (direction === 1) {
            diffArray[start]++;
            if (end + 1 < n) diffArray[end + 1]--;
        } else {
            diffArray[start]--;
            if (end + 1 < n) diffArray[end + 1]++;
        }
    }

    // Compute the cumulative sum of shifts
    let cumulativeShift = 0;
    const result = s.split('');

    for (let i = 0; i < n; i++) {
        cumulativeShift = (cumulativeShift + diffArray[i]) % 26;

        // Adjust for negative shifts
        if (cumulativeShift < 0) cumulativeShift += 26;

        // Apply the shift to the current character
        const shiftedChar = String.fromCharCode(
            'a'.charCodeAt(0) +
            (s.charCodeAt(i) - 'a'.charCodeAt(0) + cumulativeShift) % 26
        );
        result[i] = shiftedChar;
    }

    return result.join('');
};

/*********************************************************************************************
 *                                 Time and Space Complexity                                 *
 *********************************************************************************************/
/* Brute Force Approach:                                                                    
   - Time Complexity: O(n * m), where n = s.length, m = shifts.length.                       
   - Space Complexity: O(n), for the array storing ASCII values.                             
 
   Enhanced Approach:                                                                      
   - Time Complexity: O(n + m), where n = s.length, m = shifts.length.                       
   - Space Complexity: O(n), for the difference array and result storage.                    
 *********************************************************************************************/
