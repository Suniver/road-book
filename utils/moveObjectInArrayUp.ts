export default function moveObjectUp(arr: any[], index: number): any[] {
  if (index <= 0 || index >= arr.length) {
    // If the index is 0 (first element) or out of bounds, return the array as-is
    return arr;
  }

  // Swap the elements at index and index - 1
  const temp = arr[index - 1];
  arr[index - 1] = arr[index];
  arr[index] = temp;

  return arr;
}
