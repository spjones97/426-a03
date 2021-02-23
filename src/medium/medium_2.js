import mpg_data from "./data/mpg_data.js";
import {
    getStatistics
} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: mpgStats(mpg_data),
    allYearStats: yearStats(mpg_data),
    ratioHybrids: hybridStats(mpg_data),
};

export function mpgStats(data) {
    let sum_city = 0;
    let sum_highway = 0;
    let out = new Object();
    for (let i = 0; i < data.length; i++) {
        sum_city += data[i]['city_mpg'];
        sum_highway += data[i]['highway_mpg'];
    }
    out['city'] = sum_city / data.length;
    out['highway'] = sum_highway / data.length;

    return out;
}

export function yearStats(data) {
    let year = [];
    for (let i = 0; i < data.length; i++) {
        year[year.length] = data[i]['year'];
    }
    return getStatistics(year);
}

export function hybridStats(data) {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i]['hybrid']) {
            count++;
        }
    }
    return count / data.length;
}

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 */

export function hybridMakes(data) {
    let objects = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i]['hybrid']) {
            let make = data[i]['make'];
            let found = false;
            for (let j = 0; j < objects.length; j++) {
                if (objects[j]['make'] == make) {
                    found = true;
                    let list = objects[j]['hybrids'];
                    list[list.length] = data[i]['id'];
                }
            }
            if (!found) {
                let temp = new Object();
                temp['make'] = make;
                temp['hybrids'] = [data[i]['id']];
                objects[objects.length] = temp;
            }
        }
    }
    return objects;
}

/**
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */

export function avgMpgYear(data) {
    let objects = new Object();
    for (let i = 0; i < data.length; i++) {
        let year = data[i]['year'];
        if (objects[year] == null) {
            let hybrid = new Object();
            hybrid = avgHybrid(year, data);
            let notHybrid = new Object();
            notHybrid = avgNotHybrid(year, data);
            objects[year] = {
                hybrid,
                notHybrid
            };
        }
    }
    return objects;
}

export function avgHybrid(year, data) {
    let sum_city = 0;
    let sum_highway = 0;
    let count = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i]['year'] == year && data[i]['hybrid']) {
            sum_city += data[i]['city_mpg'];
            sum_highway += data[i]['highway_mpg'];
            count++;
        }
    }
    return {
        city: sum_city / count,
        highway: sum_highway / count
    }
}

export function avgNotHybrid(year, data) {
    let sum_city = 0;
    let sum_highway = 0;
    let count = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i]['year'] == year && !data[i]['hybrid']) {
            sum_city += data[i]['city_mpg'];
            sum_highway += data[i]['highway_mpg'];
            count++;
        }
    }
    return {
        city: sum_city / count,
        highway: sum_highway / count
    }
}

export const moreStats = {
    makerHybrids: hybridMakes(mpg_data),
    avgMpgByYearAndHybrid: avgMpgYear(mpg_data)
};