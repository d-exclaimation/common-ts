//
//  array.ts
//  common
//
//  Created by d-exclaimation on 06 Feb 2023
//

import { Reps } from "./types.js";
import { isDefined } from "./utils.js";

type Add<T extends unknown[], Acc = 0> = T extends [infer Head, ...infer Tail]
  ? Add<Tail, [...Reps<Head>, ...Reps<Acc>]["length"]>
  : Acc;

/**
 * Completely type-safe adding numbers together
 *
 * **Warning**:
 * Max to 1000, as Typescript type recursion is limited to 1000
 *
 * @param initial The initial value
 * @param args The other numbers to add
 * @returns The sum of all the numbers with complete type safety
 *
 *
 * @example
 * ```ts
 * const a = add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
 * //    ^? const a: 55
 * ```
 */
export function add<K, T extends number[]>(initial: K, ...args: T): Add<T, K>;
export function add(...args: number[]): number {
  return args.reduce((acc, val) => acc + val, 0);
}

/**
 * Sum an array of numbers
 * @param arr The array of numbers
 * @returns The sum of all the numbers
 */
export function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}

/**
 * Sum an array of by a given numeric property
 * @param arr The array of objects
 * @returns The sum of all the numbers
 */
export function sumBy<T>(arr: T[], prop: (val: T) => number): number {
  return arr.reduce((acc, val) => acc + prop(val), 0);
}

/**
 * Remove null and undefined from an array
 * @param arr The array to compact
 * @returns An array without null and undefined
 */
export function compact<T>(arr: (T | null | undefined)[]) {
  return arr.filter((val): val is T => isDefined(val));
}

/**
 * Compact and map an array
 * @param arr The array to compact and map
 * @param map The function to map
 * @returns An array without null and undefined
 */
export function compactMap<T, U>(
  arr: T[],
  map: (val: T) => U | null | undefined
) {
  return compact(arr.map(map));
}

/**
 * Remove duplicates from an array
 * @param arr The array to remove duplicates from
 * @returns An array without duplicates
 */
export function uniq<T>(arr: T[]): T[] {
  const seen = new Set<T>();
  return arr.filter((val) => {
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
}

/**
 * Remove duplicates from an array by a given property
 * @param arr The array to remove duplicates from
 * @param prop The property to compare
 * @returns An array without duplicates
 */
export function uniqBy<T, U>(arr: T[], prop: (val: T) => U) {
  const seen = new Set<U>();
  return arr.filter((val) => {
    const key = prop(val);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Sort an array
 * @param arr The array to sort
 * @returns A sorted array
 */
export function sort<T>(arr: T[]): T[] {
  return [...arr].sort();
}

/**
 * Sort an array by given keys
 * @param arr The array to sort
 * @param keys The keys to sort by
 * @returns A sorted array
 */
export function sortBy<T>(arr: T[], ...keys: ((val: T) => any)[]) {
  return [...arr].sort((a, b) => {
    for (const key of keys) {
      const keyA = key(a);
      const keyB = key(b);
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
    }
    return 0;
  });
}

/**
 * Partition an array by a given predicate
 * @param arr The array to partition
 * @param predicate The predicate to partition by
 * @returns An array of two arrays, the first one is the truthy partition, the second one is the falsy partition
 */
export function partition<T>(arr: T[], predicate: (val: T) => boolean) {
  return [
    arr.filter((val) => predicate(val)),
    arr.filter((val) => !predicate(val)),
  ];
}

/**
 * Remove an element from an array
 * @param arr - Array to remove from
 * @param element - Element to remove
 * @returns Array without the element
 */
export const remove = <T>(arr: T[], element: T): T[] => {
  const index = arr.indexOf(element);
  return arr.filter((_, i) => i !== index);
};

/**
 * Remove the first element that matches a predicate from an array
 * @param arr - Array to remove from
 * @param predicate - Predicate to match
 * @returns Array without the element
 */
export const removeFirst = <T>(
  arr: T[],
  predicate: (arg_0: T) => boolean
): T[] => {
  const index = arr.findIndex(predicate);
  return arr.filter((_, i) => i !== index);
};

/**
 * Fill an array with a given amount of elements
 * @param amount The amount of elements to fill
 * @param initial The function to fill the array with
 * @returns An array of the given amount of elements
 */
export const fill = <T>(amount: number, initial: () => T): T[] =>
  Array.from({ length: amount })
    .fill(null)
    .map(() => initial());
