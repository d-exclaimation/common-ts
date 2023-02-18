//
//  index.ts
//  common
//
//  Created by d-exclaimation on 22 Jan 2023
//

import type { Distriminated, Matches } from "./types.js";

/**
 * Pattern match a union with a identifiable type distriminator
 * @param input The input with the union type to be matched against
 * @param matchers Matchers would be run if having matching key signature
 * @returns The output / return type of all the matcher functions
 */
export function match<
  In extends Distriminated<string>,
  Matchers extends Partial<Matches<In, any>> & { "*": (input: In) => any }
>(
  input: In,
  matchers: Matchers
): Matchers[keyof Matchers] extends (...args: any[]) => any
  ? ReturnType<Matchers[keyof Matchers]>
  : ReturnType<Matchers["*"]>;

/**
 * Pattern match a union with a identifiable type distriminator
 * @param input The input with the union type to be matched against
 * @param matchers Matchers would be run if having matching key signature
 * @returns The output / return type of all the matcher functions
 */
export function match<
  In extends Distriminated<string>,
  Matchers extends Matches<In, any>
>(
  input: In,
  matchers: Matchers
): Matchers extends Matches<In, infer Returned> ? Returned : void;

/**
 * Pattern match a union with a identifiable type distriminator
 * @param input The input with the union type to be matched against
 * @param matchers Matchers would be run if having matching key signature
 * @returns The output / return type of all the matcher functions
 */
export function match<In extends Distriminated<string>, Out>(
  input: In,
  matchers:
    | Matches<In, Out>
    | (Partial<Matches<In, Out>> & { "*": (input: In) => Out })
): Out {
  for (const [key, handler] of Object.entries(matchers)) {
    if (input.kind === key) {
      return (handler as (input: In) => Out)(input);
    }
  }

  if ("*" in matchers) {
    return matchers["*"](input);
  }

  throw new Error("Pattern unmacthed");
}

/**
 * Pattern match a union with a identifiable type signature (High order function)
 *
 * @param matchers Matchers would be run if having matching key signature
 * @returns The output / return type of all the matcher functions
 */
export function matches<
  In extends Distriminated<string>,
  Matchers extends Partial<Matches<In, any>> & { "*": (input: In) => any }
>(
  matchers: Matchers
): (
  input: In
) => Matchers[keyof Matchers] extends (...args: any[]) => any
  ? ReturnType<Matchers[keyof Matchers]>
  : ReturnType<Matchers["*"]>;

/**
 * Pattern match a union with a identifiable type signature (High order function)
 *
 * @param matchers Matchers would be run if having matching key signature
 * @returns The output / return type of all the matcher functions
 */
export function matches<
  In extends Distriminated<string>,
  Matchers extends Matches<In, any>
>(
  matchers: Matchers
): (
  input: In
) => Matchers extends Matches<In, infer Returned> ? Returned : void;

/**
 * Pattern match a union with a identifiable type signature (High order function)
 *
 * @param matchers Matchers would be run if having matching key signature
 * @returns The output / return type of all the matcher functions
 */
export function matches<In extends Distriminated<string>, Out>(
  matchers:
    | Matches<In, Out>
    | (Partial<Matches<In, Out>> & { "*": (input: In) => Out })
): (input: In) => Out {
  return (input) => {
    for (const [key, handler] of Object.entries(matchers)) {
      if (input.kind === key) {
        return (handler as (input: In) => Out)(input);
      }
    }

    if ("*" in matchers) {
      return matchers["*"](input);
    }

    throw new Error("Pattern unmacthed");
  };
}
