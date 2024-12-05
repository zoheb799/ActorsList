import { Response } from 'express';

interface CustomError extends Error {
  message: string;
}

export const handleError = (res: Response, error: CustomError) => {
  console.error(error);
  res.status(500).json({ message: 'Server Error', error: error.message });
};

export const handleSuccess = <T>(res: Response, data: T) => {
  res.status(200).json(data);
};
