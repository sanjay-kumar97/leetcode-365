/*********************************************************************************************
 *                                   Problem: Word Subsets                                   *
 *                                   ---------------------                                   *
 *                                                                                           *
 * Problem Description:                                                                      *
 * We are given two string arrays, `words1` and `words2`. A string `b` is a subset of string *
 * `a` if every letter in `b` occurs in `a` at least as many times as it occurs in `b`.      *
 * A universal string in `words1` is a string that is a superset of every string in `words2`.*
 * Return a list of all universal strings in `words1`.                                       *
 *                                                                                           *
 * Example:                                                                                  *
 *    Input:                                                                                 *
 *       words1 = ["amazon","apple","facebook","google","leetcode"],                         *
 *       words2 = ["e","o"]                                                                  *
 *    Output: ["facebook","google","leetcode"]                                               *
 *********************************************************************************************/

/*********************************************************************************************
 *                                 Brute Force Approach                                      *
 *********************************************************************************************/

var wordSubsetsBruteForce = function (words1, words2) {
    const words2Count = words2.map((w) => {
        const count = {};
        for (let char of w) {
            count[char] = (count[char] || 0) + 1;
        }
        return count;
    });

    return words1.filter((word) =>
        words2Count.every((count) =>
            Object.keys(count).every(
                (char) => word.split(char).length - 1 >= count[char]
            )
        )
    );
};

/*********************************************************************************************
 *                                  Enhanced Approach                                        *
 *********************************************************************************************/

var wordSubsetsEnhanced = function (words1, words2) {
    let ans = [];
    let maxfreq = Array(26).fill(0);

    for (let str of words2) {
        let freq = Array(26).fill(0);
        for (let ch of str) {
            freq[ch.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }
        for (let i = 0; i < 26; i++) {
            maxfreq[i] = Math.max(maxfreq[i], freq[i]);
        }
    }

    for (let str of words1) {
        let freq = Array(26).fill(0);
        for (let ch of str) {
            freq[ch.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        let issubset = true;
        for (let i = 0; i < 26; i++) {
            if (freq[i] < maxfreq[i]) {
                issubset = false;
                break;
            }
        }
        if (issubset) ans.push(str);
    }

    return ans;
};

/*********************************************************************************************
 *                                 Time and Space Complexity                                 *
 *********************************************************************************************/
/* Brute Force Approach:                                                                
   - Time Complexity: O(N * M * L), where N is the number of words in `words1`, 
     M is the number of words in `words2`, and L is the average length of the strings.
   - Space Complexity: O(M * L) for the count arrays of `words2`.

   Enhanced Approach:                                                                  
   - Time Complexity: O(N * L + M * L), where N is the number of words in `words1`, 
     M is the number of words in `words2`, and L is the average length of the strings.
   - Space Complexity: O(26 + M * L), which simplifies to O(M * L).
 *********************************************************************************************/
