/**
 * Sorts an array of integers using the QuickSort algorithm.
 * @param {Array.<number>} items Array of items to be sorted.
 */
aij.quickSort = function(items) {

    /**
     * Partition the array in-place around a random pivot.
     * @param {Array.<number>} arr Reference to the partitioned array.
     * @param {number} left The start index of the partitioned array section.
     * @param {number} right The end index of the partitioned array section.
     */
    var partition = function(arr, left, right) {
      if (right === left) {
        return;
      }

      // Get a random pivot and move it to the beginning of the array.
      var pivotIndex = (Math.random() * (right - left) + left) << 0,
          pivot = arr[pivotIndex];

      aij.swap(arr, left, pivotIndex);

      // Organize the array around the pivot.
      var partitionIndex = left + 1;
      for (var i = left + 1; i < right; i++) {
        if (arr[i] < pivot) {
          aij.swap(arr, partitionIndex, i)
          partitionIndex++;
        }
      };

      // Put the pivot element in its rightful place.
      aij.swap(arr, partitionIndex - 1, left);

      // Recursively partition the sub-arrays before and after the pivot.
      partition(arr, left, partitionIndex - 1);
      partition(arr, partitionIndex, right);
    };

    // Initiate QuickSort on the input array.
    return aij.isSortable(items) && partition(items, 0, items.length) || items;
};
