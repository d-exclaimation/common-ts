//
//  extend.ts
//  common
//
//  Created by d-exclaimation on 22 Jan 2023
//

import type { z, ZodTypeAny } from "zod";
import type { ZodExtensions } from "./types.js";

/**
 * Extends a zod schema with useful function for creating and validating object as if they were structs
 * @param param0.of The object schema
 * @param param0.fields Additional fields for the schema
 * @param param0.extensions Additional extensions for the schema
 * @returns A zod schema with the extensions
 */
export function struct<
  T extends ZodTypeAny,
  Fields extends Record<string, unknown> = {},
  Extensions extends Record<string, unknown> = {}
>({ of: schema, extensions, fields }: ZodExtensions<T, Fields, Extensions>) {
  return extend({
    of: schema,
    fields: fields,
    extensions: (t) => ({
      new: (input: z.infer<T>): z.infer<T> => t.parse(input),
      async: (input: z.infer<T>): z.infer<T> => t.parseAsync(input),
      maybe: (input: Partial<z.infer<T>>): z.infer<T> | null => {
        const res = t.safeParse(input);
        if (!res.success) return null;
        return res.data;
      },
      validate: (input: unknown) => t.safeParse(input).success,
      ...(extensions?.(t) ?? ({} as Extensions)),
      ...(arg: z.infer<T>) => arg,
    }),
  });
}

/**
 * Extends a zod schema
 * @param param0.of The object schema
 * @param param0.fields Additional fields for the schema
 * @param param0.extensions Additional extensions for the schema
 * @returns A zod schema with the extensions
 */
export function extend<
  T extends ZodTypeAny,
  Fields extends Record<string, unknown> = {},
  Extensions extends Record<string, unknown> = {}
>({
  of: schema,
  extensions,
  fields,
}: ZodExtensions<T, Fields, Extensions>): T & Fields & Extensions {
  return {
    ...schema,
    ...(fields ?? ({} as Fields)),
    ...(extensions?.(schema) ?? ({} as Extensions)),
  };
}
