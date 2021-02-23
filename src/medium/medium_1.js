import {
    variance
} from "./data/stats_helpers.js";

import {
    maxAndMin
} from "../mild/mild_1.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum;
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    let len = array.length;
    let arr = sort(array);
    if (len % 2 != 0) {
        return arr[Math.floor(len / 2)];
    }
    return (arr[Math.floor((len - 1) / 2)] + arr[Math.floor(len / 2)]) / 2;
}

export function sort(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[i]) {
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
    }
    return array;
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    let var_length = array.length;
    let var_sum = getSum(array);
    let var_mean = var_sum / array.length;
    let var_median = getMedian(array);
    let minMax = maxAndMin(array);
    let var_min = minMax.min;
    let var_max = minMax.max;
    let var_variance = variance(array, var_mean);
    let var_standard_deviation = Math.sqrt(var_variance);

    return {
        length: var_length,
        sum: var_sum,
        mean: var_mean,
        median: var_median,
        min: var_min,
        max: var_max,
        variance: var_variance,
        standard_deviation: var_standard_deviation
    }
}