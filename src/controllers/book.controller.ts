import { NextFunction, Request, Response } from "express";

import BookService from "services/book.service";

class BookController {
	public bookService: BookService;

	constructor() {
		this.bookService = new BookService();
	}

	public getBooks = async (req: Request, res: Response, next: NextFunction) => {
		const queryResult = await this.bookService.getBooks();

		if (queryResult.length === 0)
			return next({ statusCode: 400, message: "Did not find any books" });

		res.status(200).json(queryResult);
	};

	public getBook = async (req: Request, res: Response, next: NextFunction) => {
		const bookId = req.params.id;
		const options = req.query;

		const queryResult = await this.bookService.getBook(bookId, options);

		if (queryResult.length === 0)
			return next({ statusCode: 403, message: "Book does not exist" });

		res.status(200).json(queryResult);
	};

	public addBook = async (req: Request, res: Response, next: NextFunction) => {
		const bookBody = req.body;
		await this.bookService.addBook(bookBody);

		res.status(200).json({ message: "Book has been added" });
	};

	public updateBook = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const bookBody = req.body;
		const bookId = req.params.id;

		const bookExist = await this.bookService.getBook(bookId);

		if (bookExist.length === 0)
			return next({ statusCode: 404, message: "Book does not exist" });

		await this.bookService.updateBook(bookBody, bookId);

		res.status(200).json({ message: "Book has been updated" });
	};

	public deleteBook = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const bookId = req.params.id;

		const bookExist = await this.bookService.getBook(bookId);

		if (bookExist.length === 0)
			return next({ statusCode: 404, message: "Book does not exist" });

		await this.bookService.deleteBook(bookId);

		res.status(200).json({ message: "Book has been deleted" });
	};
}

export default BookController;
