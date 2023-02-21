//
//  number.ts
//  common
//
//  Created by d-exclaimation on 06 Feb 2023
//

/**
 * Clamp a number between a min and max value
 * @param num The number to clamp
 * @param args The min and max value
 * @returns The number if it's between the min and max value, otherwise the min or max value
 */
export const clamp = (num: number, args: { min: number; max: number }) =>
  Math.max(Math.min(num, args.max), args.min);
