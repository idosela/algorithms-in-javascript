/**
 * Sorts an array of integers using the BubbleSort algorithm.
 * @param {Array.<number>} items Array of items to be sorted.
 */
aij.bubbleSort = function(items) {
    var sort = function(arr) {
      var swapped,
          endIndex = arr.length;

      do {
        swapped = false;

        for (var i = 0; i < endIndex - 1; i++) {
          if (arr[i+1] < arr[i]) {
            aij.swap(arr, i, i + 1);
            swapped = true;
          }
        };

        endIndex--;
      } while(swapped);

      return arr;
    };

    // Initiate SelectionSort on the input array.
    return aij.isSortable(items) ? sort(items) : items;
};
