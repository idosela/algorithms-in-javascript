/**
 * Sorts an array of integers using the InsertionSort algorithm.
 * @param {Array.<number>} items Array of items to be sorted.
 */
aij.insertionSort = function(items) {
    var sort = function(arr) {
      var length = arr.length;

      for (var i = 0; i < length; i++) {
        var j = i,
            item = arr[j];

        while(j > 0 && arr[j - 1] > item) {
          arr[j] = arr[j - 1];
          j--;
        };

        arr[j] = item;
      };

      return arr;
    };

    // Initiate SelectionSort on the input array.
    return aij.isSortable(items) ? sort(items) : items;
};
