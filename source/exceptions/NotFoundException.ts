import { HttpStatusCodes, HttpMessages } from '../utils/responsesEnum';

class NotFountException extends Error {
  public status;
  public message;

  constructor(message?: string) {
    super(message);
    this.status = HttpStatusCodes.NOT_FOUND;
    this.message = message ?? HttpMessages.NOT_FOUND;
  }
}

export default NotFountException;