import { ParsedQs } from "qs";
import toJson from "@utils/json.converter";
import Database from "database";
import { BookBody } from "@interfaces/service.interfaces";

class BookService {
	public dbConnect: Database;

	constructor() {
		this.dbConnect = new Database();
	}

	public async getBooks() {
		const sqlQuery = "SELECT * FROM BOOKS";
		const result = await this.dbConnect.dbQuery(sqlQuery);
		const jsonResult = toJson(result);

		return jsonResult;
	}

	public async getBook(bookId: string, options?: ParsedQs) {
		const sqlQuery = `SELECT * FROM BOOKS b JOIN AUTHORS a ON b.author_id = a.id WHERE b.id = ${bookId}`;
		const result = await this.dbConnect.dbQuery(sqlQuery);
		const jsonResult = toJson(result);

		return jsonResult;
	}

	public async addBook(book: BookBody) {
		const sqlQuery = `
			INSERT INTO BOOKS (id, title, author_id, genre, release_date, edition, amount)
				VALUES
					(
						books_id_seq.NEXTVAL,
						:title,
						:author_id,
						:genre,
						TO_DATE(:release_date, 'DD-MM-YYYY'),
						:edition,
						:amount
					)
		`;

		this.dbConnect.dbQuery(sqlQuery, book);
	}

	public async updateBook(book: BookBody, id: string) {
		book["id"] = id;

		const sqlQuery = `
			UPDATE 
				BOOKS
			SET 
				title = :title,
				author_id = :author_id,
				genre = :genre,
				release_date = TO_DATE(:release_date, 'DD-MM-YYYY'),
				edition = :edition,
				amount = :amount
			WHERE 
				id = :id
			`;

		this.dbConnect.dbQuery(sqlQuery, book);
	}

	public async deleteBook(bookId: string) {
		const sqlQuery = `DELETE FROM BOOKS WHERE id = :bookId`;
		this.dbConnect.dbQuery(sqlQuery, { bookId });
	}
}

export default BookService;
