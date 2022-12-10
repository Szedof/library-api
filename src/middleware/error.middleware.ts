import { HttpException } from "@interfaces/httpException.interface";
import { NextFunction, Request, Response } from "express";

const errorHandler = (
	error: HttpException,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const statusCode: number = error.statusCode;
		const message: string = error.message;

		res.status(statusCode).json({ message });
	} catch (error) {
		next(error);
	}
};

export default errorHandler;
