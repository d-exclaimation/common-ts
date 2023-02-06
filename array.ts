//
//  array.ts
//  common
//
//  Created by d-exclaimation on 06 Feb 2023
//

export const fill = <T>(amount: number, initial: () => T): T[] =>
  Array.from({ length: amount })
    .fill(null)
    .map(() => initial());
