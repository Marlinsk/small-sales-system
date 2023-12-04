export default class Exception extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message)
    this.status = status;
    this.message = message;
    this.name = this.constructor.name;
    Error.captureStackTrace(this.constructor)
  }
}