import { Router } from "express";

export interface DatabaseENV {
	username: string;
	password: string;
	hostname: string;
	port: number;
}
