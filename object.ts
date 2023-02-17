//
//  object.ts
//  common
//
//  Created by d-exclaimation on 17 Feb 2023
//

export function entries<T extends {}>(obj: T) {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

export function keys<T extends {}>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}
