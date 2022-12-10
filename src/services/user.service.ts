import { UserBody } from "@interfaces/service.interfaces";
import toJson from "@utils/json.converter";
import Database from "database";

class UsersService {
	public dbConnect: Database;

	constructor() {
		this.dbConnect = new Database();
	}

	public async getUsers() {
		const sqlQuery = "SELECT * FROM USERS";
		const result = await this.dbConnect.dbQuery(sqlQuery);
		const resultJson = toJson(result);

		return resultJson;
	}

	public async getUser(id: string, address?: boolean) {
		let sqlQuery =
			"SELECT * FROM USERS u JOIN ROLES r ON u.role_id = r.id WHERE u.id = :id";

		if (address)
			sqlQuery =
				"SELECT * FROM USERS u JOIN ADDRESSES d ON u.address_id = d.id JOIN ROLES r ON u.role_id = r.id WHERE u.id = :id";

		const result = await this.dbConnect.dbQuery(sqlQuery, { id });
		const resultJson = toJson(result);

		return resultJson;
	}

	public async addUser(user: UserBody) {
		const sqlQuery = `
				INSERT INTO USERS (id, firstname, lastname, email, role_id, password) 
				VALUES (users_id_seq.NEXTVAL, :firstname, :lastname, :email, :role_id, :password)`;

		const result = await this.dbConnect.dbQuery(sqlQuery, user);
		const resultJson = toJson(result);

		return resultJson;
	}

	public updateUser() {}

	public async deleteUser(id: string) {
		const sqlQuery = "DELETE FROM BOOKS WHERE id = :id";

		await this.dbConnect.dbQuery(sqlQuery, { id });
	}

	public async userHas(condition: string) {
		const sqlQuery = `SELECT * FROM USERS WHERE ${condition}`;
		const result = await this.dbConnect.dbQuery(sqlQuery);
		const resultJson = toJson(result);

		return resultJson;
	}
}

export default UsersService;
