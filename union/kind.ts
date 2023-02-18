//

import { Distriminated, PayloadNarrow } from "./types.js";

/**
 * Create a discriminated object that may be part of a discriminated union
 * @param tag The tag literal
 * @param payload The payload of the type
 * @returns The discriminated object
 */
export function kind<Tag extends string, T extends Record<string, unknown>>(
  tag: Tag,
  payload: T
) {
  return {
    ...payload,
    kind: tag,
  };
}

/**
 * Union instance that allow quick creation of discriminated objects that's part of of the discriminated union
 *
 * @example
 * ```ts
 * type Message = Union<{
 *  ping: {},
 *  start: { id: string, query: string },
 *  stop: { id: string },
 * }>;
 *
 * const { ping, start, stop } = union<Message>();
 *
 * const pingMsg = ping({}) satisfies Message;
 * //    ^? { kind: "ping" }
 * const startMsg = start({ id: "1", query: "hello" }) satisfies Message;
 * //    ^? { kind: "start", id: "1", query: "hello" }
 * const stopMsg = stop({ id: "1" }) satisfies Message;
 * //    ^? { kind: "stop", id: "1" }
 * ```
 */
type UnionInstance<U extends Distriminated<string>> = {
  [K in U["kind"] & string]: <T extends PayloadNarrow<U, K>>(
    payload: T
  ) => {
    kind: K;
  } & T;
};

/**
 * Union instance that allow quick creation of discriminated objects that's part of of the discriminated union
 *
 * @example
 * ```ts
 * type Message = Union<{
 *  ping: {},
 *  start: { id: string, query: string },
 *  stop: { id: string },
 * }>;
 *
 * const { ping, start, stop } = union<Message>();
 *
 * const pingMsg = ping({}) satisfies Message;
 * //    ^? { kind: "ping" }
 * const startMsg = start({ id: "1", query: "hello" }) satisfies Message;
 * //    ^? { kind: "start", id: "1", query: "hello" }
 * const stopMsg = stop({ id: "1" }) satisfies Message;
 * //    ^? { kind: "stop", id: "1" }
 * ```
 */
export function union<U extends Distriminated<string>>() {
  return new Proxy({} as UnionInstance<U>, {
    get: <K extends U["kind"] & string>(_: any, key: K) => {
      return <T extends PayloadNarrow<U, K>>(payload: T) => {
        return kind(key, payload);
      };
    },
  });
}
