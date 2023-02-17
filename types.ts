//
//  types.ts
//  common
//
//  Created by d-exclaimation on 17 Feb 2023
//

export type Reps<T, V = false, Acc extends V[] = []> = T extends number
  ? Acc["length"] extends T
    ? Acc
    : Reps<T, V, [...Acc, V]>
  : never;
