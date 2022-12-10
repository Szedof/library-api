import dotenv from "dotenv";

dotenv.config();

const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_HOSTNAME = process.env.DB_HOSTNAME || "";
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 1521;

const SERVER_PORT = process.env.SERVER_PORT
	? Number(process.env.SERVER_PORT)
	: 5001;

export const config = {
	database: {
		username: DB_USERNAME,
		password: DB_PASSWORD,
		hostname: DB_HOSTNAME,
		port: DB_PORT,
	},
	port: SERVER_PORT,
};
