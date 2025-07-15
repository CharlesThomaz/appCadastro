import express, { Request, Response, NextFunction } from "express";
import { AppError } from "./errors/AppError.js";
import cors from "cors";
import { routes } from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "")
  .split(",")
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // permite request sem origem (ex: Postman)

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origem não permitida pelo CORS"));
    }
  }
}));

app.use(express.json());

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ erro: err.message });
  }

  console.error("Erro inesperado:", err);
  return res.status(500).json({ erro: "Erro interno do servidor" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando no endereço http://localhost:${PORT}`);
});
