/*********************************************************************************************
 *                      Problem: Find the Prefix Common Array of Two Arrays                  *
 *                      ---------------------------------------------------                  *
 *                                                                                           *
 * Problem Description:                                                                      *
 * You are given two 0-indexed integer permutations A and B of length n.                     *
 * A prefix common array of A and B is an array C such that C[i] is equal to the count of    *
 * numbers that are present at or before the index i in both A and B.                        *
 * Return the prefix common array of A and B.                                                *
 *                                                                                           *
 * Example:                                                                                  *
 *    Input: A = [1,3,2,4], B = [3,1,2,4]                                                    *
 *    Output: [0,2,3,4]                                                                      *
 *    Explanation:                                                                           *
 *      - At i = 0: no number is common, so C[0] = 0.                                        *
 *      - At i = 1: 1 and 3 are common in A and B, so C[1] = 2.                              *
 *      - At i = 2: 1, 2, and 3 are common in A and B, so C[2] = 3.                          *
 *      - At i = 3: 1, 2, 3, and 4 are common in A and B, so C[3] = 4.                       *
 *********************************************************************************************/

/*********************************************************************************************
 *                                 Brute Force Approach                                      *
 *********************************************************************************************/

var findThePrefixCommonArrayBruteForce = function (A, B) {
    const len = A.length;
    const frequency = new Map();
    const result = new Array(len).fill(0);

    for (let i = 0; i < len; i++) {
        frequency.set(A[i], (frequency.get(A[i]) ?? 0) + 1);
        frequency.set(B[i], (frequency.get(B[i]) ?? 0) + 1);

        let commonCount = 0;
        for (let count of frequency.values()) {
            if (count === 2) commonCount += 1;
        }
        result[i] = commonCount;
    }

    return result;
};

/*********************************************************************************************
 *                                  Optimized Approach                                       *
 *********************************************************************************************/

var findThePrefixCommonArrayOptimized = function (A, B) {
    const len = A.length;
    let count = 0;
    const frequency = new Array(len + 1).fill(0);
    const prefix = new Array(len).fill(0);

    for (let i = 0; i < len; ++i) {
        frequency[A[i]] += 1;
        if (frequency[A[i]] === 2) ++count;

        frequency[B[i]] += 1;
        if (frequency[B[i]] === 2) ++count;

        prefix[i] = count;
    }

    return prefix;
};

/*********************************************************************************************
 *                                 Time and Space Complexity                                 *
 *********************************************************************************************/
/* Brute Force Approach:                                                                
   - Time Complexity: O(n^2), where n is the length of arrays A and B. For each index, we 
     traverse the frequency map to count common elements.
   - Space Complexity: O(n), for storing the frequency map.

   Optimized Approach:                                                                  
   - Time Complexity: O(n), where n is the length of arrays A and B. We traverse the arrays 
     once and update counts in constant time.
   - Space Complexity: O(n), for the frequency array and prefix result array.
 *********************************************************************************************/
