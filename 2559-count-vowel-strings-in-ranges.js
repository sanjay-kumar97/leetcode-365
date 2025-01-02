/*********************************************************************************************
 *                         Problem: Count Vowel Strings in Ranges                            *
 *                         --------------------------------------                            *
 *                                                                                           *
 * Problem Description:                                                                      *
 * Given a list of strings `words` and a list of queries `queries`, where each query         *
 * is represented as `[start, end]`, determine how many strings in the range from `start`    *
 * to `end` (inclusive) start and end with a vowel.                                          *
 *                                                                                           *
 * Vowels are 'a', 'e', 'i', 'o', 'u'.                                                       *
 *                                                                                           *
 * Example:                                                                                  *
 *    Input:                                                                                 *
 *       words = ["apple", "banana", "orange", "umbrella", "ice"]                            *
 *       queries = [[0, 2], [1, 4], [0, 4]]                                                  *
 *    Output: [2, 3, 4]                                                                      *
 *                                                                                           *
 *********************************************************************************************/

/*********************************************************************************************
 *                                 Brute Force Approach                                      *
 *********************************************************************************************/

var countVowelStringsBruteForce = function (words, queries) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const result = [];

    function isValid(word) {
        return vowels.includes(word[0]) && vowels.includes(word[word.length - 1]);
    }

    for (const [start, end] of queries) {
        const subArray = words.slice(start, end + 1);
        result.push(subArray.filter(isValid).length);
    }

    return result;
};

/*********************************************************************************************
 *                                  Enhanced Approach                                        *
 *********************************************************************************************/

var countVowelStringsEnhanced = function (words, queries) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    const prefix = [];
    const result = [];
    let count = 0;

    function isValid(word) {
        return vowels.has(word[0]) && vowels.has(word[word.length - 1]);
    }

    for (const word of words) {
        if (isValid(word)) count++;
        prefix.push(count);
    }

    for (const [start, end] of queries) {
        result.push(start === 0 ? prefix[end] : prefix[end] - prefix[start - 1]);
    }

    return result;
};

/*********************************************************************************************
 *                                 Time and Space Complexity                                 *
 *********************************************************************************************/
/* Brute Force Approach:                                                                    
   - Time Complexity: O(q * n), where `q` is the number of queries and `n` is the average   
     size of the range in a query. This is due to slicing and filtering for each query.     
   - Space Complexity: O(n) for storing the sliced subarray.                                

   Enhanced Approach:                                                                       
   - Time Complexity: O(n + q), where `n` is the size of the `words` array and `q` is the   
     number of queries. Building the prefix sum array is O(n), and processing queries is    
     O(1) per query.                                                                        
   - Space Complexity: O(n) for the prefix sum array.                                       
 *********************************************************************************************/
