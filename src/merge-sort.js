/**
 * Sorts an array of integers using the MergeSort algorithm.
 * @param {Array.<number>} items Array of items to be sorted.
 */
aij.mergeSort = function(items) {
    var merge = function(left, right) {
        var result = [],
            len = left.length + right.length,
            li = 0,
            ri = 0;

        for (var i = 0; i < len; i++) {
            if (li < left.length && left[li] <= (right[ri] || Number.MAX_VALUE)) {
                result[i] = left[li];
                li++;
            } else {
                result[i] = right[ri];
                ri++;
            }
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
