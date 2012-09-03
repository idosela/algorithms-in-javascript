/**
 * Define "aij" as the global namespace.
 */
var aij = {
    /**
     * Swap the item in index i with the item in index j.
     * @param {Array.<number>} arr The array containing the items.
     * @param {number} i The index of the first swapped item.
     * @param {number} j The index of the second swapped item.
     */
    swap: function(arr, i, j) {
      var swapped = arr[i];
      arr[i] = arr[j];
      arr[j] = swapped;
    },

    /**
     * Verify that an object is an array with more than one element.
     * @param {*} obj The object to verify.
     * @return {boolean} True if the verified object is an array with at least
     *     one element.
     */
    isSortable: function(obj) {
      return obj && toString.call(obj) === '[object Array]' && obj.length > 1;
    }
};
