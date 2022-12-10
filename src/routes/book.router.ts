import { Routes } from "@interfaces/router.interface";
import { Router } from "express";
import BookController from "controllers/book.controller";

class BooksRouter implements Routes {
	public path: string;
	public router: Router;
	public bookController: BookController;

	constructor() {
		this.path = "/books";
		this.router = Router();
		this.bookController = new BookController();

		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, this.bookController.getBooks);
		this.router.get(`${this.path}/:id`, this.bookController.getBook);
		this.router.post(`${this.path}`, this.bookController.addBook);
		this.router.patch(`${this.path}/:id`, this.bookController.updateBook);
		this.router.delete(`${this.path}/:id`, this.bookController.deleteBook);
	}
}

export default BooksRouter;
