//
//  types.ts
//  common
//
//  Created by d-exclaimation on 22 Jan 2023
//

import type { ZodTypeAny } from "zod";

/**
 * All kind of extensions for a zod schema
 * @template T The zod schema
 * @template Fields Additional fields
 * @template Extensions Additional extensions
 */
export type ZodExtensions<
  T extends ZodTypeAny,
  Fields extends Record<string, unknown> = {},
  Extensions extends Record<string, unknown> = {}
> = {
  of: T;
  fields?: Fields;
  extensions?: (schema: T) => Extensions;
};
