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

/**
 * Type-safe Object.values
 * @param obj The object to get values from
 * @returns The values of the object
 */
export function values<T extends Record<string | number | symbol, any>>(
  obj: T
) {
  return Object.values(obj) as T[keyof T][];
}

export type MapValues<
  O extends Record<string | number | symbol, any>,
  B extends (value: keyof O) => any
> = {
  [Key in keyof O]: B extends (value: Key) => infer R ? R : O[Key];
};

/**
 * Map the values of an object
 * @param obj The object to map
 * @param map The mapping function
 * @returns The mapped object
 */
export function mapValues<
  T extends Record<string | number | symbol, any>,
  Map extends (value: keyof T) => any
>(obj: T, map: Map): MapValues<T, Map> {
  return entries(obj).map(([key, value]) => [key, map(value)]) as MapValues<
    T,
    Map
  >;
}
