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

/**
 * Create a function that allow the head argument to be provided later (as a curried function) or normally
 *
 * **Limitation**: Generic type cannot be inferred, use `fnx` instead
 *
 * @param arity The number of arguments to be injected
 * @param fn The function to be curried
 * @returns A curried function that take the head argument and also the original function itself
 * @example
 * ```ts
 * const join = fn(2, (strings: string[], separator: string) => strings.join(separator));
 *
 * join(["Hello", "World"], " "); // "Hello World" (normal)
 * join(" ")(["Hello", "World"]); // "Hello World" (curried)
 *
 * // (pipeable)
 * pipe(
 *  ["Hello", "World"],
 *  join(" "),
 * );
 * ```
 */
export function fn<Fn extends (...args: any[]) => any>(arity: number, fn: Fn) {
  return fnx<
    (...tail: TailIns<Fn>) => (head: HeadIn<Fn>) => ReturnType<Fn>,
    Fn
  >(arity, fn);
}

/**
 * Create a function that allow the head argument to be provided later (as a curried function) or normally (generic version)
 * @param arity The number of arguments to be injected
 * @param body The function to be curried
 * @returns A curried function that take the head argument and also the original function itself
 * @example
 * ```ts
 * const tap = fnx<
 *  <T>(fn: (arg: T) => void) => (arg: T) => T,
 *  <T>(fn: (arg: T) => void, arg: T) => T
 * >(2, (fn, arg) => {
 *  fn(arg);
 *  return arg;
 * });
 *
 * tap("Hello", console.log); // "Hello" (normal)
 * tap(console.log)("Hello"); // "Hello" (curried)
 *
 * // (pipeable)
 * pipe(
 *  "Hello",
 *  tap(console.log),
 * );
 * ```
 */
export function fnx<
  DataLast extends (...args: Array<any>) => any,
  DataFirst extends (...args: Array<any>) => any
>(
  arity: Parameters<DataFirst>["length"],
  body: DataFirst
): DataLast & DataFirst {
  const isDataFirst: (args: IArguments) => boolean = (args) =>
    args.length >= arity;
  return function () {
    if (isDataFirst(arguments)) {
      // @ts-expect-error
      return body.apply(this, arguments);
    }
    return ((self: any) => body(self, ...arguments)) as any;
  } as any;
}
