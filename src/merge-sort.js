/**
 * Sorts an array of integers using the MergeSort algorithm.
 * @param {Array.<number>} items Array of items to be sorted.
 */
aij.mergeSort = (function () {
  "use strict";

  function simpleMerge(a, from, pivot, to, buffer) {
    var i = -1;
    while (++i < to - pivot) {
      buffer[i] = a[i + pivot];
    }
    --i;
    --pivot;
    while (i >= 0) {
      --to;
      if (pivot >= from && buffer[i] < a[pivot]) {
        a[to] = a[pivot];
        --pivot;
      } else {
        a[to] = buffer[i];
        --i;
      }
    }
  }

  function mergeSort(a, from, to, buffer) {
    if (to - from > 1) {
      var middle = from + Math.floor((to - from) / 2);
      mergeSort(a, from, middle, buffer);
      mergeSort(a, middle, to, buffer);
      simpleMerge(a, from, middle, to, buffer);
    }
    return a;
  }

  return function (items) {
    return mergeSort(items, 0, items.length, items.slice(0));
  };
}());
