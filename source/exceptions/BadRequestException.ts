import { HttpMessages, HttpStatusCodes } from '../utils/responsesEnum';

class BadRequestException extends Error {
  public status;

  constructor(message?: string) {
    super(message);
    this.status = HttpStatusCodes.BAD_REQUEST;
    this.message = message ?? HttpMessages.BAD_REQUEST;
  }
}

export default BadRequestException;
