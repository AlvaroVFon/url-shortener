import { HttpStatusCodes, HttpMessages } from '../utils/responsesEnum';

class ForbiddenException extends Error {
  public status: number;
  public message: string;

  constructor(message?: string) {
    super(message);
    this.status = HttpStatusCodes.FORBIDDEN;
    this.message = message ?? HttpMessages.FORBIDDEN;
  }
}

export default ForbiddenException;

