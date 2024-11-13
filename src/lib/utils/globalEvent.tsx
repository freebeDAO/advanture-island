// globalEvent.ts
class GlobalEvent {
  private static instance: GlobalEvent
  public eventObject: any
  constructor() {
    this.eventObject = {}
  }
  public subscribe(eventKey: string, callBack: Function) {
    if (this.eventObject[eventKey]) {
      this.eventObject[eventKey] = [...this.eventObject[eventKey], callBack]
    } else {
      this.eventObject[eventKey] = [callBack]
    }
  }
  public submit(eventKey: string, ...params: any) {
    const callBack = this.eventObject[eventKey]
    if (callBack && callBack.length) {
      callBack.forEach((cb: Function) => {
        cb(...params)
      })
    }
  }
  static getInstance(): GlobalEvent {
    if (!this.instance) {
      this.instance = new GlobalEvent()
    }
    return this.instance
  }
}
export default GlobalEvent
