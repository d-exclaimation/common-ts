//
//  promise.ts
//  common
//
//  Created by d-exclaimation on 22 Jan 2023
//

/**
 * Create a promised-based delay for a set amount of time
 * @param ms The time of the delay in milliseconds
 * @returns A promise for the delay
 */
export const sleep = (ms: number) =>
  new Promise<void>((r) => setTimeout(r, ms));
