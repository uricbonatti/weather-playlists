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
  const errorResponse = celebrateErrorResponses.find((response: any) =>
    response.keys.includes(key)
  );
  if (!errorResponse) {
    return {
      status: 'error',
      message: celebrateDefaultMessage.replace(/["]/g, "'")
    };
  }
  const { keys, ...response } = errorResponse;
  return response;
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
      } = detail as any;
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
