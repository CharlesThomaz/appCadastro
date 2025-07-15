import { IController } from "./IController";
import { Request, Response, NextFunction } from "express";
import db from "../models/database/db";
import { TipoUser } from "../models/types/tipoUser";
import z, { ZodError } from "zod";
import { AppError } from "../errors/AppError.js";



export class UserController implements IController {
  async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const lista = await db<TipoUser>("tbl_user").select()
      res.json(lista);

    } catch (error) {
      next(error);
    }

  }
  async getByName(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const nameUser = req.query.getByName as string;

      if (!nameUser) {
        return res.status(400).json({ mensagem: "Parâmetro 'getByName' é obrigatório." });
      }

      const users = await db("tbl_user")
        .select("nameUser", "emailUser")
        .where("nameUser", "like", `%${nameUser}%`);

      if (users.length === 0) {
        return res.status(404).json({ mensagem: "Nenhum usuário encontrado." });
      }

      res.json(users);

    } catch (error) {
      next(error);
    }

  }




  async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    const bodySchema = z.object({
      nameUser: z.string(),
      emailUser: z.email()
    });

    try {
      const { nameUser, emailUser } = bodySchema.parse(req.body);

      await db<TipoUser>("tbl_user").insert({
        nameUser,
        emailUser
      });

      res.status(201).json({ nameUser, emailUser });

    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({ erros: error.format() });
      }

      if (error.code === 'SQLITE_CONSTRAINT') {
        return res.status(409).json({ erro: 'E-mail já cadastrado.' });
      }

      next(error);
    }
  }


  update(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new AppError("Method not implemented.");
  }
  delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    throw new AppError("Method not implemented.");
  }

}