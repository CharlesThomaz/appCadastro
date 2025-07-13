import express, { Request, Response, NextFunction } from "express";
import { AppError } from "./errors/AppError";
import cors from "cors";
import { routes } from "./routes/route";

const app = express();
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
app.use(cors({
  origin: "http://127.0.0.1:5500"
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
