import { HttpStatusCodes, HttpMessages } from '../utils/responsesEnum';

class UnauthorizedException extends Error {
  public status: number;
  public message: string;

  constructor(message?: string) {
    super(message);
    this.status = HttpStatusCodes.UNAUTHORIZED;
    this.message = message ?? HttpMessages.UNAUTHORIZED;
  }
}

export default UnauthorizedException;
