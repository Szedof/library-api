import UsersService from "@services/user.service";
import { Request, Response, NextFunction } from "express";

class UserController {
	public userService: UsersService;

	constructor() {
		this.userService = new UsersService();
	}

	public getUsers = async (req: Request, res: Response, next: NextFunction) => {
		const query = await this.userService.getUsers();

		if (query.length === 0)
			return next({ statusCode: 404, message: "Did not find users" });

		res.status(200).json(query);
	};

	public getUser = async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.params.id;
		const addressInfo = req.query.address;
		let query;

		if (addressInfo === "true")
			query = await this.userService.getUser(userId, true);
		else query = await this.userService.getUser(userId);

		if (query.length === 0)
			return next({ statusCode: 404, message: "Did not find user" });

		res.status(200).json(query);
	};

	public addUser = async (req: Request, res: Response, next: NextFunction) => {
		const userBody = req.body;

		const findUser = await this.userService.userHas(
			`email = ${userBody.email}`
		);
		if (findUser.length != 0)
			return res.status(409).json({ message: "User already exists" });

		await this.userService.addUser(userBody);

		res.status(200).json({ message: "User has been added" });
	};

	public updateUser = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const test = req.body;
	};

	public deleteUser = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const userId = req.params.id;

		const findUser = await this.userService.getUser(userId);

		if (findUser.length === 0)
			return next({ statusCode: 404, message: "User does not exist" });

		res.status(200).json({ message: "User has been deleted" });
	};
}

export default UserController;
