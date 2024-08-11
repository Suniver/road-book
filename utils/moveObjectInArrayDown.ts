export default function moveObjectDown(arr: any[], index: number): any[] {
  if (index < 0 || index >= arr.length - 1) {
    // If the index is out of bounds or at the last position, return the array as-is
    return arr;
  }

  // Swap the elements at index and index + 1
  const temp = arr[index + 1];
  arr[index + 1] = arr[index];
  arr[index] = temp;

  return arr;
}
