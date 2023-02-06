//
//  ulid.ts
//  common
//
//  Created by d-exclaimation on 22 Jan 2023
//

import type { z } from "zod";
import { extend } from "./extend.js";

const BASE32_CROCKFORD_REGEX =
  /^[0123456789ABCDEFGHJKMNPQRSTVWXYZabcdefghjkmnpqrstvwxyz]{26}$/;

/**
 * Check if the string is in a form of a ULID
 * @param arg The input string
 * @returns True if the value is in a form of a ULID
 */
export function ulidLike(arg: string): arg is string {
  return BASE32_CROCKFORD_REGEX.test(arg.toUpperCase());
}

/**
 * Universally Unique Lexicographically Sortable Identifier
 */
export const ulid = (schema: z.ZodString) =>
  extend({
    of: schema.refine(ulidLike, "Invalid ULID"),
    fields: {
      like: ulidLike,
    },
    extensions: (t) => ({
      new: (input: z.infer<typeof t>): z.infer<typeof t> => t.parse(input),
      maybe: (input: z.infer<typeof t>): z.infer<typeof t> | null => {
        const res = t.safeParse(input);
        if (!res.success) return null;
        return res.data;
      },
      validate: (input: unknown) => t.safeParse(input).success,
    }),
  });
