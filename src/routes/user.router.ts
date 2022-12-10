import UserController from "@controllers/user.controller";
import { Routes } from "@interfaces/router.interface";
import { Router } from "express";

class UsersRouter implements Routes {
	public path: string;
	public router: Router;
	public userController: UserController;

	constructor() {
		this.path = "/users";
		this.router = Router();
		this.userController = new UserController();

		this.initializeRoutes();
	}

	public initializeRoutes() {
		this.router.get(`${this.path}`, this.userController.getUsers);
		this.router.get(`${this.path}/:id`, this.userController.getUser);
		this.router.post(`${this.path}`, this.userController.addUser);
		this.router.patch(`${this.path}/:id`, this.userController.updateUser);
		this.router.delete(`${this.path}/:id`, this.userController.deleteUser);
	}
}

export default UsersRouter;
