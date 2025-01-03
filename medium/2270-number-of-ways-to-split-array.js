/*********************************************************************************************
 *                            Problem: Number of Ways to Split Array                         *
 *                            --------------------------------------                         *
 *                                                                                           *
 * Problem Description:                                                                      *
 * Given an integer array `nums`, determine the number of ways to split it into two          *
 * non-empty parts such that the sum of the left part is greater than or equal to the        *
 * sum of the right part.                                                                    *
 *                                                                                           *
 * Example:                                                                                  *
 *    Input: nums = [10, 4, -8, 7]                                                           *
 *    Output: 2                                                                              *
 *    Explanation:                                                                           *
 *    - Split the array as [10, 4] and [-8, 7], leftSum = 14, rightSum = -1.                 *
 *    - Split the array as [10, 4, -8] and [7], leftSum = 6, rightSum = 7.                   *
 *********************************************************************************************/

/*********************************************************************************************
 *                                 Brute Force Approach                                      *
 *********************************************************************************************/

var waysToSplitArrayBruteForce = function (nums) {
    let result = 0;
    function getSum(nums) {
        let sum = 0;
        for (let i = 0; i < nums.length; i++) {
            sum += nums[i];
        }
        return sum;
    }
    for (let i = 0; i < nums.length - 1; i++) {
        let leftSum = getSum(nums.slice(0, i + 1));
        let rightSum = getSum(nums.slice(i + 1));
        if (leftSum >= rightSum) {
            result++;
        }
    }
    return result;
};

/*********************************************************************************************
 *                                  Enhanced Approach                                        *
 *********************************************************************************************/

var waysToSplitArrayEnhanced = function (nums) {
    let totalSum = nums.reduce((sum, num) => sum + num);
    let leftSum = 0, result = 0;

    for (let i = 0; i < nums.length - 1; i++) {
        leftSum += nums[i];
        if (leftSum >= totalSum - leftSum) result++;
    }

    return result;
};

/*********************************************************************************************
 *                                 Time and Space Complexity                                 *
 *********************************************************************************************/
/* Brute Force Approach:                                                                    
   - Time Complexity: O(n²)                                                                 
   - Space Complexity: O(n)                                                                 
 
   Enhanced Approach:                                                                       
   - Time Complexity: O(n)                                                                 
   - Space Complexity: O(1)                                                                
 *********************************************************************************************/
