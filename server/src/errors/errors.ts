abstract class BaseError extends Error {
  public readonly status: number;

  protected constructor(status: number, message: string) {
    super(message);

    this.status = status;
    this.name = this.constructor.name;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class BadRequestError extends BaseError {
  constructor(message: string) {
    super(400, message);
  }
}

class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(401, message);
  }
}

class ForbiddenError extends BaseError {
  constructor(message: string) {
    super(403, message);
  }
}

class NotFoundError extends BaseError {
  constructor(message: string) {
    super(404, message);
  }
}

export {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ForbiddenError,
  BaseError,
};
