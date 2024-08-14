import type { IRessource } from "~/types/ressource";

export default function excludeResourcesFromArray(
  originArr: IRessource[],
  excludeArr: IRessource[]
): IRessource[] {
  if (!excludeArr) {
    return originArr;
  }
  // Create a Set of names from excludeArr for quick lookup
  const excludeNames = new Set(excludeArr.map((obj) => obj.name));

  // Filter the originArr to exclude objects with names present in excludeNames
  return originArr.filter((obj) => !excludeNames.has(obj.name));
}
