//
//  number.ts
//  common
//
//  Created by d-exclaimation on 06 Feb 2023
//

export const clamp = (num: number, args: { min: number; max: number }) =>
  Math.max(Math.min(num, args.max), args.min);
