import { BaseError } from './CustomErrors';

export class HttpException extends BaseError {
  public status: number;
  constructor(code: number, status: number, message: string) {
    super(code, message);
    this.code = code;
    this.status = status;
    this.message = message;
  }
}

export class NotAuthorizedException extends HttpException {
  constructor() {
    super(1000, 403, "You're not authorized");
  }
}

export class UserNotFoundException extends HttpException {
  constructor(id: string) {
    super(2000, 404, `User with id ${id} not found`);
  }
}

export class GroupNotFoundException extends HttpException {
  constructor(id: string) {
    super(3000, 404, `Group with id ${id} not found`);
  }
}
