//
//  object.ts
//  common
//
//  Created by d-exclaimation on 17 Feb 2023
//

export type Entries<T extends Record<string | number | symbol, any>> = Array<
  {
    [K in keyof T]: [K, T[K]];
  }[keyof T]
>;

/**
 * Type-safe Object.entries
 * @param obj The object to get entries from
 * @returns The entries of the object
 */
export function entries<T extends Record<string | number | symbol, any>>(
  obj: T
) {
  return Object.entries(obj) as Entries<T>;
}

/**
 * Type-safe Object.keys
 * @param obj The object to get keys from
 * @returns The keys of the object
 */
export function keys<T extends Record<string | number | symbol, any>>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}
