//
//  utils.ts
//  common
//
//  Created by d-exclaimation on 24 Aug 2024
//

/**
 * Check if the value is defined
 * @param value The value to check
 * @returns Whether the value is defined
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return !isNil(value);
}

/**
 * Check if the value is null or undefined
 * @param value The value to check
 * @returns Whether the value is null or undefined
 */
export function isNil(value: any): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Check if the value is a boolean
 * @param value The value to check
 * @returns Whether the value is a boolean
 */
export function isBoolean(value: any): value is boolean {
  return typeof value === "boolean";
}

/**
 * Check if the value is a number
 * @param value The value to check
 * @returns Whether the value is a number
 */
export function isNumber(value: any): value is number {
  return typeof value === "number";
}

/**
 * Check if the value is a string
 * @param value The value to check
 * @returns Whether the value is a string
 */
export function isString(value: any): value is string {
  return typeof value === "string";
}

/**
 * Check if the value is a symbol
 * @param value The value to check
 * @returns Whether the value is a symbol
 */
export function isSymbol(value: any): value is symbol {
  return typeof value === "symbol";
}

/**
 * Check if the value is a function
 * @param value The value to check
 * @returns Whether the value is a function
 */
export function isFunction(value: any): value is Function {
  return typeof value === "function";
}

/**
 * Check if the value is an object
 * @param value The value to check
 * @returns Whether the value is an object
 */
export function isObject(value: any): value is Record<string, any> {
  return typeof value === "object" && value !== null;
}

/**
 * Check if the value is an array
 * @param value The value to check
 * @returns Whether the value is an array
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

/**
 * Check if the value is a Map
 * @param value The value to check
 * @returns Whether the value is a Map
 */
export function isMap(value: any): value is Map<any, any> {
  return value instanceof Map;
}

/**
 * Check if the value is a Set
 * @param value The value to check
 * @returns Whether the value is a Set
 */
export function isSet(value: any): value is Set<any> {
  return value instanceof Set;
}

/**
 * Check if the value is a Promise
 * @param value The value to check
 * @returns Whether the value is a Promise
 */
export function isPromise(value: any): value is Promise<any> {
  return value instanceof Promise;
}

/**
 * Check if the value is a Date
 * @param value The value to check
 * @returns Whether the value is a Date
 */
export function isDate(value: any): value is Date {
  return value instanceof Date;
}

/**
 * Check if the value is a RegExp
 * @param value The value to check
 * @returns Whether the value is a RegExp
 */
export function isRegExp(value: any): value is RegExp {
  return value instanceof RegExp;
}

/**
 * Check if the value is a BigInt
 * @param value The value to check
 * @returns Whether the value is a BigInt
 */
export function isBigInt(value: any): value is bigint {
  return typeof value === "bigint";
}
