import oracledb, { Connection } from "oracledb";

import { config } from "@config";
import { DatabaseENV } from "@interfaces/app.interfaces";

class Database {
	private env: DatabaseENV;
	private connectionConfig: {
		user: string;
		password: string;
		connectionString: string;
		poolAlias: string;
	};

	constructor() {
		this.env = config.database;
		this.connectionConfig = {
			user: this.env.username,
			password: this.env.password,
			connectionString: `${this.env.hostname}:${this.env.port}/oltpstud`,
			poolAlias: "libpool",
		};
	}

	public initializeClient(): void {
		oracledb.initOracleClient({ libDir: "C:\\oracle\\instantclient_21_7" });
	}

	public async connectionPool() {
		await oracledb.createPool(this.connectionConfig);
	}

	public async getConnection(): Promise<Connection> {
		let connection;
		try {
			connection = await oracledb.getConnection("libpool");

			return connection;
		} catch (error) {
			return Promise.reject(error);
		}
	}

	public async dbQuery(query: string, obj?: any) {
		try {
			const connection = await this.getConnection();
			const result = await connection.execute(query, obj ? obj : {}, {
				autoCommit: true,
			});

			await connection.close();

			return result;
		} catch (error) {
			return Promise.reject(error);
		}
	}
}

export default Database;
