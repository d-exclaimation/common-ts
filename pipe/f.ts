//
//  f.ts
//  common
//
//  Created by d-exclaimation on 22 Jan 2023
//

import type { FuncLike, HeadIn, PipeableFunc, TailIns } from "./types.js";

/**
 * Create a function that allow the head argument / input to be injected given the tailing arguments / inputs
 *
 * **Limitation**: Generic type cannot be inferred
 *
 * @param func Function to be converted into a higher order function
 * @param args All tailing arguments / inputs
 * @returns A pipeable function that take the head argument / input of the orignal function
 */
export function f<T extends FuncLike>(
  func: T,
  ...args: TailIns<T>
): PipeableFunc<HeadIn<T>, ReturnType<T>> {
  return (value) => func(value, ...args);
}

type Uncurry<T, Acc extends any[] = []> = T extends (arg: infer Arg) => infer R
  ? Uncurry<R, [...Acc, Arg]>
  : (...args: Acc) => T;

/**
 * Create a function that uncurry the given function arguments
 * @param func Function to be uncurried
 * @returns A function that take all the arguments at once
 */
export function b<Arg, T>(func: (arg: Arg) => T): Uncurry<(arg: Arg) => T>;
export function b(func: (arg: any) => any): (...args: any[]) => any {
  return (...args) => {
    const [arg, ...rest] = args;
    if (rest.length === 0) return func(arg);

    // Don't mind this, it's just to make the type checker happy :)
    const rec = b(func(arg)) as (...args: any[]) => any;
    return rec(...rest);
  };
}
