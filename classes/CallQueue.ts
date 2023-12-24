export class CallQueue {
  queue = Promise.resolve()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  add(cb: () => Promise<any>) {
    this.queue = this.queue.then(async () => {
      try {
        await cb()
      } catch (error) {
        console.error(error)
      }
    })
  }
}
