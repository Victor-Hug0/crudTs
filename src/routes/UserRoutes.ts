import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

export default class UserRoutes {
    public router: Router;
    private userController: UserController = new UserController();

    constructor(){
        this.router = Router();
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post("/", this.userController.createUser);
        this.router.get("/:id", this.userController.getUserByid);
        this.router.get("/", this.userController.getAllUsers);
    }
}