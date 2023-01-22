//
//  task.ts
//  common
//
//  Created by d-exclaimation on 22 Jan 2023
//

/**
 * Create a task to enqueued into the EventLoop Task FIFO queue
 *
 * Task orders:
 * - macro: Timers order on Event Loop operations queue
 * - micro: Promises order on Event Loop operations queue
 * - poll: Poll order on Event Loop
 *
 * @param order Order of in the event loop task queue
 * @param action The action is to be perfomed
 */
export function task(
  order: "poll" | "macro" | "micro",
  action: () => void
): void {
  switch (order) {
    case "poll":
      action();
      break;
    case "macro":
      setTimeout(action, 0);
      break;
    case "micro":
      Promise.resolve().then(() => action());
      break;
  }
}

/**
 * Create a "micro" task to enqueued into the EventLoop Task FIFO queue
 * @param action The action is to be perfomed
 */
export function microtask(action: () => void) {
  return task("micro", action);
}

/**
 * Create a "macro" task to enqueued into the EventLoop Task FIFO queue
 * @param action The action is to be perfomed
 */
export function macrotask(action: () => void) {
  return task("macro", action);
}
