//
//  result.ts
//  common
//
//  Created by d-exclaimation on 09 Mar 2023
//

import { kind } from "./kind.js";
import type { Narrow, Union } from "./types.js";

type ResultMethods<T, E> = {
  /**
   * Returns the contained Ok value, consuming the self value.
   * @returns The contained Ok value
   * @throws Throws the contained Err value if the self value is an Err
   */
  unwrap(): T;

  /**
   * Returns the contained Err value, consuming the self value.
   * @returns The contained Err value
   * @throws Throws the contained Ok value if the self value is an Ok
   */
  unwrapErr(): E;

  /**
   * Returns the contained Ok value or a provided default.
   * @param fallback Fallback value
   * @returns The contained Ok value or a provided default
   * @throws Throws the contained Err value if the self value is an Err
   */
  unwrapOr(fallback: T): T;

  /**
   * Returns the contained Ok value or undefined.
   * @returns The contained Ok value or undefined
   * @throws Throws the contained Err value if the self value is an Err
   */
  optional(): T | undefined;
};

/**
 * Result is a type that represents either success (Ok) or failure (Err).
 */
export type Result<T, E = Error> = Union<{
  ok: { data: T } & ResultMethods<T, E>;
  err: { error: E } & ResultMethods<T, E>;
}>;

export const Result = {
  /**
   * Returns true if the result is Ok.
   * @param result Result to check
   * @returns True if the result is Ok
   */
  isOK: <T, E>(result: Result<T, E>): result is Ok<T> => result.kind === "ok",

  /**
   * Returns true if the result is Err.
   * @param result Result to check
   * @returns True if the result is Err
   */
  isErr: <T, E>(result: Result<T, E>): result is Err<E> =>
    result.kind === "err",

  /**
   * Returns the contained Err value, consuming the self value.
   * @param result Result to unwrap
   * @returns The contained Err value
   * @throws Throws the contained Ok value if the self value is an Ok
   */
  unwrapErr: <T, E>(result: Result<T, E>): E => {
    if (result.kind === "err") return result.error;
    throw result.data;
  },

  /**
   * Returns the contained Ok value or a provided default.
   * @param result Result to unwrap
   * @param fallback Fallback value
   * @returns The contained Ok value or a provided default
   */
  unwrapOr<T, E>(result: Result<T, E>) {
    return (fallback: T) => {
      if (result.kind === "ok") return result.data;
      return fallback;
    };
  },

  /**
   * Returns the contained Ok value or undefined.
   * @param result Result to unwrap
   * @returns The contained Ok value or undefined
   */
  optional: <T, E>(result: Result<T, E>): T | undefined => {
    if (result.kind === "ok") return result.data;
    return undefined;
  },
};

/**
 * Ok is a type that represents a successful result.
 */
type Ok<T> = Narrow<Result<T, never>, "ok">;
const Ok = <T>(data: T): Ok<T> =>
  kind("ok", {
    data,
    unwrap: () => data,
    unwrapErr: () => {
      throw data;
    },
    optional: () => data,
    unwrapOr: (_: T) => data,
  });

/**
 * Err is a type that represents a failed result.
 */
type Err<E> = Narrow<Result<never, E>, "err">;
const Err = <E>(error: E): Err<E> =>
  kind("err", {
    error,
    unwrap: () => {
      throw error;
    },
    unwrapErr: () => error,
    optional: () => undefined,
    unwrapOr: (fallback: never) => fallback,
  });
