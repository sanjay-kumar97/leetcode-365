/*********************************************************************************************
 *                                   Problem: Two Sum                                        *
 *                                   -----------------                                       *
 *                                                                                           *
 * Problem Description: Given an array of integers nums and an integer target, return        *
 *                      indices of the two numbers such that they add up to target.          *
 * Example:                                                                                  *
 *    Input: nums = [2,7,11,15], target = 9                                                  *
 *    Output: [0,1]                                                                          *
 *********************************************************************************************/

/*********************************************************************************************
 *                                 Brute Force Approach                                      *
 *********************************************************************************************/

var twoSumBruteForce = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};

/*********************************************************************************************
 *                                  Enhanced Approach                                        *
 *********************************************************************************************/

var twoSumEnhanced = function (nums, target) {
    let map = new Map();

    for (let i = 0; i < nums.length; i++) {
        let difference = target - nums[i];
        if (map.has(difference)) {
            return [map.get(difference), i];
        }
        map.set(nums[i], i);
    }
};

/*********************************************************************************************
 *                                 Time and Space Complexity                                 *
 *********************************************************************************************/
/* Brute Force Approach:                                                                    
   - Time Complexity: O(n^2)                                                                 
   - Space Complexity: O(1)                                                                 
 
   Enhanced Approach:                                                                      
   - Time Complexity: O(n)                                                                  
   - Space Complexity: O(n)                                                                 
 *********************************************************************************************/
