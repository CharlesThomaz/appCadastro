import { Router } from "express";
import { UserController } from "../controllers/User-Controller";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/", userController.index);

userRoutes.post("/",userController.create )

userRoutes.get("/pesquisar",userController.getByName )

export default userRoutes;
