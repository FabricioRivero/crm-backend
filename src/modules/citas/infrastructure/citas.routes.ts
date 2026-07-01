import { Router } from 'express';
import { CitaController } from './CitaController';
import { InMemoryCitaRepository } from './InMemoryCitaRepository';
import { AgendarCitaUseCase } from '../application/AgendarCitaUseCase';
import { CambiarEstadoCitaUseCase } from '../application/CambiarEstadoCitaUseCase';
import { ListarCitasUseCase } from '../application/ListarCitasUseCase';

const citaRepository = new InMemoryCitaRepository();
const agendarCitaUseCase = new AgendarCitaUseCase(citaRepository);
const cambiarEstadoCitaUseCase = new CambiarEstadoCitaUseCase(citaRepository);
const listarCitasUseCase = new ListarCitasUseCase(citaRepository);
const citaController = new CitaController(
  agendarCitaUseCase,
  cambiarEstadoCitaUseCase,
  listarCitasUseCase,
);

export const citasRouter = Router();

citasRouter.post('/', citaController.agendar);
citasRouter.patch('/:id/estado', citaController.cambiarEstado);
citasRouter.get('/', citaController.listar);
