import { Request, Response, NextFunction } from "express";

export interface IController {
  index(req: Request, res: Response, next: NextFunction): Promise<void>;
  getByName(req: Request, res: Response, next: NextFunction): Promise<void>;
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
  delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}
