//
//  iterator.ts
//  common
//
//  Created by d-exclaimation on 17 Feb 2023
//

/**
 * Async Channel implementation that allow yielding values and closing the channel without using generators
 * @template T The type of the channel
 */
export class AsyncChannel<T> implements AsyncIterator<T> {
  private pullQueue: ((value: IteratorResult<T>) => void)[];
  private pushQueue: T[];
  private running: boolean;

  constructor() {
    this.pullQueue = [];
    this.pushQueue = [];
    this.running = true;
  }

  async next(): Promise<IteratorResult<T>> {
    return this.pull();
  }

  async return(): Promise<IteratorResult<T>> {
    return { value: undefined, done: true };
  }

  async throw?(e?: any): Promise<IteratorResult<T>> {
    return Promise.reject(e);
  }

  /**
   * Push a value to the channel
   * @param value The value to push
   * @returns void
   */
  public yield(value: T): void {
    this.push(value);
  }

  /**
   * Close the channel
   * @returns void
   */
  public finish(): void {
    this.empty();
  }

  private push(value: T): void {
    const pulling = this.pullQueue.shift();
    if (pulling) {
      return pulling(
        this.running ? { value, done: false } : { value: undefined, done: true }
      );
    }
    this.pushQueue.push(value);
  }

  private pull(): Promise<IteratorResult<T>> {
    return new Promise<IteratorResult<T>>((resolve) => {
      const value = this.pushQueue.shift();
      if (value) {
        return resolve(
          this.running
            ? { value, done: false }
            : { value: undefined, done: true }
        );
      }
      this.pullQueue.push(resolve);
    });
  }

  private empty() {
    if (!this.running) {
      return;
    }
    this.running = false;
    this.pullQueue.forEach((resolve) =>
      resolve({ value: undefined, done: true })
    );
    this.pullQueue.length = 0;
    this.pushQueue.length = 0;
  }

  /**
   * Async Iterator
   * @returns Async Iterator
   */
  public [Symbol.asyncIterator](): AsyncIterator<T> {
    return this;
  }
}

/**
 * Async Stream implementation that allow yielding values and closing the channel
 * @template T The type of the channel
 */
export class AsyncStream<T> implements AsyncIterator<T> {
  private channel: AsyncChannel<T>;

  constructor(exec: (cont: AsyncChannel<T>) => void) {
    this.channel = new AsyncChannel<T>();
    exec(this.channel);
  }

  async next(): Promise<IteratorResult<T>> {
    return this.channel.next();
  }

  async return(): Promise<IteratorResult<T>> {
    return { value: undefined, done: true };
  }

  async throw?(e?: any): Promise<IteratorResult<T>> {
    return Promise.reject(e);
  }

  public [Symbol.asyncIterator](): AsyncIterator<T> {
    return this.channel;
  }
}
