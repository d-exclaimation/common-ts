//
//  types.ts
//  common
//
//  Created by d-exclaimation on 22 Jan 2023
//

/**
 * A signature that allow type to be uniquely identified
 *
 * @template K The key type to identify the signature
 */
export type Distriminated<K> = { readonly kind: K };

/**
 * Union types from a definition of a key and payload object that can be uniquely identified with a signature
 *
 * @template Def The key and payload definition object
 */
export type Union<Def extends Record<string, Record<string, unknown>>> = {
  [Key in keyof Def]: Def[Key] & Distriminated<Key>;
}[keyof Def];

/**
 * Narrow down a union type with a unique signature key
 *
 * **Limitation**: Narrow functionality is limited when generic is nested within the Unity and Key
 *
 * @template Unity The union type that contains a signature
 * @template Key The signature to narrow down the type
 */
export type Narrow<
  Unity extends Distriminated<string>,
  Key extends Unity["kind"]
> = Unity extends Distriminated<Key> ? Unity : never;

/**
 * Narrow down a union type with a unique signature key, omitting the signature
 *
 * **Limitation**: Narrow functionality is limited when generic is nested within the Unity and Key
 *
 * @template Unity The union type that contains a signature
 * @template Key The signature to narrow down the type
 */
export type PayloadNarrow<
  Unity extends Distriminated<string>,
  Key extends Unity["kind"]
> = Omit<Narrow<Unity, Key>, "kind">;

/**
 * Object containing key and function pairs for all possible types in a union based on their signature
 *
 * @template Unity The union type that contains a signature
 * @template Out The return type of all functions
 */
export type Matches<Unity extends Distriminated<string>, Out> = {
  [Key in Unity["kind"]]: (input: Narrow<Unity, Key>) => Out;
};
