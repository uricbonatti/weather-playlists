/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isCelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';
import AppError from './AppError';
import celebrateErrorResponses from './celebrateErrorResponses';

export function findOnCelebrateErrorResponse(
  key: string,
  celebrateDefaultMessage: string
) {
  const errorResponse = celebrateErrorResponses.find((errorData: any) =>
    errorData.keys.includes(key)
  );
  if (!errorResponse) {
    return {
      status: 'error',
      message: celebrateDefaultMessage.replace(/["]/g, "'")
    };
  }
  const { keys, ...errors } = errorResponse;
  return errors;
}

function errorHandler(
  err: any,
  request: Request,
  response: Response,
  _: NextFunction
) {
  if (isCelebrateError(err)) {
    const arrayErrorDetails: any[] = [];
    err.details.forEach((detail: any) => {
      const {
        details: [errorDetails]
      } = detail;
      arrayErrorDetails.push(errorDetails);
    });
    const error = arrayErrorDetails.shift();
    const responseContent = findOnCelebrateErrorResponse(
      error.context.key,
      error.message
    );
    return response.status(400).json(responseContent);
  }
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  });
}

export default errorHandler;
