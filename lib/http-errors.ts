// NOTES
/*
-> We use classes here so as to keep our errors organized
*/
export class RequestError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;

  constructor(
    statusCode: number,
    message: string,
    errors?: Record<string, string[]>
  ) {
    super(message); // -> super() calls the parent class and passes the message in this case to the parent Error class
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = 'RequestError';
  } // -> What are we expecting into this class when creating an instance out of it
}

class ValidationError extends RequestError {

}

class NotFoundError extends RequestError {}

class ForbiddenError extends RequestError {}

class UnauthorizedError extends RequestError {}
