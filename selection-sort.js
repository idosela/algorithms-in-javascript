/**
 * Sorts an array of integers using the SelectionSort algorithm.
 * @param {Array.<number>} items Array of items to be sorted.
 */
aij.selectionSort = function(items) {
    var sort = function(arr) {
      var length = arr.length;

      for (var i = 0; i < length; i++) {
        var minIndex = i;

        for (var j = i; j < length; j++) {
          if (arr[j] < arr[minIndex]) {
            minIndex = j;
          }
        };

        // Move the smallest item to the beginning of the array.
        var min = arr[minIndex];
        arr.splice(minIndex, 1);
        arr.splice(i, 0, min);
      };

      return arr;
    };

    // Initiate SelectionSort on the input array.
    return aij.isSortable(items) ? sort(items) : items;
};
