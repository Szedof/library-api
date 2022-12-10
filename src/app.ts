console.clear();
import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import Database from "database";
import { config } from "@config";
import { DatabaseENV } from "@interfaces/app.interfaces";
import { Routes } from "@interfaces/router.interface";
import errorHandler from "@middleware/error.middleware";

class App {
	public app: Application;
	public db: Database;
	public env: DatabaseENV;
	public port: number;

	constructor(routes: Routes[]) {
		this.app = express();
		this.db = new Database();
		this.env = config.database;
		this.port = config.port;

		this.initializeMiddlewares();
		this.initializeRoutes(routes);
		this.initializeErrorhandler();
	}

	public initializeMiddlewares() {
		this.db.initializeClient();
		this.db.connectionPool();
		this.app.use(cors());
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(bodyParser.json());
	}

	public initializeRoutes(routes: Routes[]) {
		routes.forEach(({ router }) => {
			this.app.use("/", router);
		});
	}

	public initializeErrorhandler() {
		this.app.use(errorHandler);
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});
	}
}

export default App;
