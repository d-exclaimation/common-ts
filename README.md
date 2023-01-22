<div align="center">
  <br />

  <h2><code>@d-exclaimation/common</code></h2>

  <h6>Zero-dependency TypeScript utilties for Node.js, Deno, Web and anything that powered by V8.</h6>

</div>

## Getting started

### Install

```sh
npm i @d-exclaimation/common
```

## Modules

- `pipe`, Pipe operator utilities
- `union`, Union related types and utilities
- `v8`, V8 engine related utilities
- `zod`, [zod](https://github.com/colinhacks/zod) related utilties

## Usage/Examples

### `pipe`

```ts
import { pipe, f } from "@d-exclaimation/common/pipe";

const add = (num: number, other: number) 
  => num + other;

const addOne = (num: number) 
  => add(num, 1);

const res0 = pipe(
  10, 
  addOne, // 11
  f(add, 11) // 22 (Uses f utility)
)

console.log(res0) // [LOG]: 22
```

### `union`
```ts
import { Union, match } from "@d-ecclaimation/common/union";

type WebSocketMessage = Union<{
  "text": { message: string },
  "binary": { buffer: ArrayBuffer }
}>;
//   ^? { __t: "text", message: string } | { __t: "binary", buffer: ArrayBuffer }

function test(arg: WebSocketMessage) {
  const msg = match(arg, {
    text: ({ message }) => message,
    binary: ({ buffer })
      => new TextDecoder("utf-8").decode(buffer)
  });
  console.log(msg);
}

test({ __t: "text", message: "Hello!" }); // [LOG]: Hello!

const bin = new Uint8Array([
  66, 105, 110, 97, 114, 121, 32, 72, 101, 108, 108, 111
])
test({ __t: "binary", buffer: bin }); // [LOG]: Binary Hello
```

### `zod`
```ts
import { z } from "zod";
import { extend } from "@d-exclaimation/common/zod";

const Post = struct({
  of: z.object({
    id: z.string(),
    content: z.string(),
    date: z.date()
  }),
  extensions: (t) => ({
    json({ date, ...post }: z.infer<typeof t>) {
      return JSON.stringify({
        ...rest,
        date: date.toISOString()
      })
    }
  })
});

// "new" from struct
const post = Post.new({
  id: "1",
  content: "Hello world",
  date: new Date()
});

console.log(Post.json(post));
// [LOG]: {"id":"1","content":"Hello world","date":"2023-01-22T08:54:41.213Z"}
```

## Feedback
If you have any feedback, feel free open an issue.

