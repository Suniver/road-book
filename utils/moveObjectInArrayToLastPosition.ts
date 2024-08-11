export default function moveObjectToLastPosition(
  arr: any[],
  index: number
): any[] {
  if (index < 0 || index >= arr.length - 1) {
    // If the index is already the last element or out of bounds, return the array as-is
    return arr;
  }

  // Remove the object from its current position
  const [objectToMove] = arr.splice(index, 1);

  // Push the object to the last position
  arr.push(objectToMove);

  return arr;
}
