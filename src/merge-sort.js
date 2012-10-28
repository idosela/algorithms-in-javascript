/**
 * Sorts an array of integers using the MergeSort algorithm.
 * @param {Array.<number>} items Array of items to be sorted.
 */
aij.mergeSort = function(items) {
    var merge = function(left, right) {
        var result = [];

        while (left.length || right.length) {
            result.push(
                left.length && left[0] <= (right[0] || Number.MAX_VALUE) ?
                left.shift() :
                right.shift());
        }

        return result;
    }

    var sort = function(arr) {
        var middle = arr && (arr.length / 2) << 0;

        if (!middle) {
            return arr;
        } else if (arr.length === 2) {
            return arr[1] < arr[0] ? arr.reverse() : arr;
        }

        return merge(sort(arr.slice(0, middle)), sort(arr.slice(middle)));
    }

    return sort(items);
};
