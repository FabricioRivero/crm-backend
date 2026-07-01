import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { clientesRouter } from './modules/clientes/infrastructure/clientes.routes';
import { citasRouter } from './modules/citas/infrastructure/citas.routes';

export function crearApp(): Application {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use('/api/clientes', clientesRouter);
  app.use('/api/citas', citasRouter);

  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
  });

  return app;
}