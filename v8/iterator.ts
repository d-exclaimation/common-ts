//
//  iterator.ts
//  common
//
//  Created by d-exclaimation on 19 Feb 2023
//

/**
 * Async Channel implementation that allow yielding values and closing the channel without using generators
 * @template T The type of the channel
 */
export class AsyncChannel<T> implements AsyncIterableIterator<T> {
  private pullQueue: ((value: IteratorResult<T>) => void)[];
  private pushQueue: T[];
  private running: boolean;

  private terminations: ((reason: "return" | "error" | "finish") => void)[];

  constructor() {
    this.pullQueue = [];
    this.pushQueue = [];
    this.running = true;
    this.terminations = [];
  }

  async next(): Promise<IteratorResult<T>> {
    return this.pull();
  }

  async return(): Promise<IteratorResult<T>> {
    this.close("return");
    return { value: undefined, done: true };
  }

  async throw?(e?: any): Promise<IteratorResult<T>> {
    this.close("error");
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
    this.close("finish");
  }

  /**
   * Register a termination callback
   * @param terminate The termination callback
   */
  public onTerminate(
    terminate: (reason: "return" | "error" | "finish") => void
  ): void {
    this.terminations.push(terminate);
  }

  /**
   * Push a value to the channel
   * @param value The value to push
   */
  private push(value: T): void {
    const pulling = this.pullQueue.shift();
    if (pulling) {
      return pulling(
        this.running ? { value, done: false } : { value: undefined, done: true }
      );
    }
    this.pushQueue.push(value);
  }

  /**
   * Pull the next value or wait for the next value
   * @returns A promise of the next value
   */
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

  /**
   * Terminates the channel with a reason
   * @param reason The reason of termination
   */
  private close(reason: "return" | "error" | "finish") {
    if (!this.running) {
      return;
    }
    this.running = false;
    this.pullQueue.forEach((resolve) =>
      resolve({ value: undefined, done: true })
    );
    this.pullQueue.length = 0;
    this.pushQueue.length = 0;
    this.terminations.forEach((terminate) => terminate(reason));
  }

  /**
   * Async Iterator
   * @returns Async Iterator
   */
  public [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    return this;
  }
}

/**
 * Async Stream implementation that allow yielding values and closing the channel
 * @template T The type of the channel
 */
export class AsyncStream<T> implements AsyncIterableIterator<T> {
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

  /**
   * Async Iterator
   * @returns Async Iterator
   */
  public [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    return this.channel;
  }
}

/**
 * Create a new Async Channel
 * @template T The type of the channel
 * @returns Async Channel
 */
export const asyncChannel = <T>() => new AsyncChannel<T>();

/**
 * Create a new Async Stream
 * @template T The type of the channel
 * @param exec The execution function that would be called with the channel
 * @returns Async Stream
 */
export const asyncStream = <T>(exec: (cont: AsyncChannel<T>) => void) =>
  new AsyncStream<T>(exec);
