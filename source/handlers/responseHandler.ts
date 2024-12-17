import { HttpResponse } from '../interfaces/response.interface';

async function responseHelper({
  req,
  res,
  status,
  message,
  data,
  error,
}: HttpResponse) {
  return res.status(status).json({
    status,
    message,
    data,
    error,
  });
}

export default responseHelper;
