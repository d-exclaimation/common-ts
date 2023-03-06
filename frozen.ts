//
//  frozen.ts
//  common
//
//  Created by d-exclaimation on 05 Mar 2023
//

/**
 * Nested immutable type compatible with all mutable types such as Array, Set, Map, Object, etc.
 */
export type Frozen<T> = T extends [infer Head]
  ? readonly [Frozen<Head>]
  : T extends [infer Head, ...infer Tail]
  ? readonly [Frozen<Head>, ...Frozen<Tail>]
  : T extends Set<infer K>
  ? ReadonlySet<K>
  : T extends (infer K)[]
  ? ReadonlyArray<Frozen<K>>
  : T extends Map<infer K, infer V>
  ? ReadonlyMap<K, V>
  : T extends {}
  ? {
      readonly [Key in keyof T]: Frozen<T[Key]>;
    }
  : T;

/**
 * Freeze the argument to be immutable (nested)
 * @param arg The value to be frozen
 * @returns A frozen version of the same values
 */
export function frz<T>(arg: T) {
  if (arg instanceof Set) {
    return Object.freeze({
      ...arg,
      add() {
        throw new TypeError("Cannot add to frozen set");
      },
      clear() {
        throw new TypeError("Cannot clear frozen set");
      },
    });
  }

  if (arg instanceof Map) {
    return Object.freeze({
      ...arg,
      set() {
        throw new TypeError("Cannot set to frozen map");
      },
      clear() {
        throw new TypeError("Cannot clear frozen map");
      },
    });
  }

  return Object.freeze(arg) as Frozen<T>;
}
