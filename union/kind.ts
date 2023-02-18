//

import { Distriminated, PayloadNarrow } from "./types.js";

export function kind<Tag extends string, T extends Record<string, unknown>>(
  tag: Tag,
  payload: T
) {
  return {
    ...payload,
    kind: tag,
  };
}

type UnionInstance<U extends Distriminated<string>> = {
  [K in U["kind"] & string]: <T extends PayloadNarrow<U, K>>(
    payload: T
  ) => {
    kind: K;
  } & T;
};

export function union<U extends Distriminated<string>>() {
  return new Proxy({} as UnionInstance<U>, {
    get: <K extends U["kind"] & string>(_: any, key: K) => {
      return <T extends PayloadNarrow<U, K>>(payload: T) => {
        return kind(key, payload);
      };
    },
  });
}
