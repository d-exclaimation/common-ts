//
//  object.ts
//  common
//
//  Created by d-exclaimation on 17 Feb 2023
//

import { Call, Entry } from "./types.js";

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
  Obj extends Record<string | number | symbol, any>,
  Fn extends (arg: Obj[keyof Obj], key: keyof Obj) => any
> = {
  [K in keyof Obj]: Call<Fn, Obj[K]>;
};

/**
 * Map values of an object by a function
 * @param obj The object to be transformed
 * @param fn The mapping function that takes the value and key
 * @returns The transformed object
 */
export const mapValues = <
  Obj extends Record<string | number | symbol, any>,
  Fn extends (arg: Obj[keyof Obj], key: keyof Obj) => any
>(
  obj: Obj,
  fn: Fn
) => {
  const res = {} as MapValues<Obj, Fn>;
  for (const key in obj) {
    const value = obj[key];
    res[key] = fn(value, key);
  }
  return res;
};

export type MapEntries<
  Obj extends Record<string | number | symbol, any>,
  Fn extends (entry: any) => [string | number | symbol, any]
> = {
  [K in keyof Obj as MapEntriesKey<Obj, Fn, K>]: MapEntriesValue<Obj, Fn, K>;
};

export type MapEntriesKey<
  Obj extends Record<string | number | symbol, any>,
  Fn extends (entry: any) => [string | number | symbol, any],
  K extends keyof Obj
> = Call<Fn, Entry<K, Obj[K]>>[0];

export type MapEntriesValue<
  Obj extends Record<string | number | symbol, any>,
  Fn extends (entry: any) => [string | number | symbol, any],
  K extends keyof Obj
> = Call<Fn, Entry<K, Obj[K]>>[1];

export type MapEntriesFn<Obj extends Record<string | number | symbol, any>> = (
  arg: {
    [K in keyof Obj]: Entry<K, Obj[K]>;
  }[keyof Obj]
) => [string | number | symbol, any];

/**
 * Map key and value pairs (entries) of an object by a function
 * @param obj The object to be transformed
 * @param fn The mapping function that takes the key and value pair (entry)
 * @returns The transformed object
 */
export const mapEntries = <
  Obj extends Record<string | number | symbol, any>,
  Fn extends MapEntriesFn<Obj>
>(
  obj: Obj,
  fn: Fn
) => {
  const res = {} as any;
  for (const key in obj) {
    const value = obj[key];
    const [k, v] = fn({ key, value });
    res[k] = v;
  }
  return res as MapEntries<Obj, Fn>;
};
