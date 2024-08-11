export default function moveObjectToFirstPosition(
  arr: any[],
  index: number
): any[] {
  if (index <= 0 || index >= arr.length) {
    // If the index is already 0 (first element) or out of bounds, return the array as-is
    return arr;
  }

  // Remove the object from its current position
  const [objectToMove] = arr.splice(index, 1);

  // Insert the object at the first position
  arr.unshift(objectToMove);

  return arr;
}
