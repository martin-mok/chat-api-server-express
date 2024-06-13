import { StatusCodes } from 'http-status-codes';
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

export const ERROR_CODE = {
  INTERNAL: 1000,
  NOT_AUTHORIZED: 1001,
  USER_NOT_FOUND: 2001,
  GROUP_NOT_FOUND: 3001,
  MESSAGE_NOT_FOUND: 3001,
};

export class InternalException extends HttpException {
  constructor() {
    super(
      ERROR_CODE.INTERNAL,
      StatusCodes.INTERNAL_SERVER_ERROR,
      'internal error',
    );
  }
}

export class NotAuthorizedException extends HttpException {
  constructor() {
    super(
      ERROR_CODE.NOT_AUTHORIZED,
      StatusCodes.FORBIDDEN,
      "You're not authorized",
    );
  }
}

export class UserNotFoundException extends HttpException {
  constructor(id: string) {
    super(ERROR_CODE.USER_NOT_FOUND, 404, `User with id ${id} not found`);
  }
}

export class GroupNotFoundException extends HttpException {
  constructor(id: string) {
    super(ERROR_CODE.GROUP_NOT_FOUND, 404, `Group with id ${id} not found`);
  }
}

export class MessageNotFoundException extends HttpException {
  constructor(id: string) {
    super(ERROR_CODE.MESSAGE_NOT_FOUND, 404, `Message with id ${id} not found`);
  }
}
