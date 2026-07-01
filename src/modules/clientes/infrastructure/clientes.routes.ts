import { Router } from 'express';
import { ClienteController } from './ClienteController';
import { InMemoryClienteRepository } from './InMemoryClienteRepository';
import { RegistrarClienteUseCase } from '../application/RegistrarClienteUseCase';
import { ListarClientesUseCase } from '../application/ListarClientesUseCase';
import { BuscarClientePorIdUseCase } from '../application/BuscarClientePorIdUseCase';

// Composición de dependencias del módulo (Inyección de Dependencias manual)
const clienteRepository = new InMemoryClienteRepository();
const registrarClienteUseCase = new RegistrarClienteUseCase(clienteRepository);
const listarClientesUseCase = new ListarClientesUseCase(clienteRepository);
const buscarClientePorIdUseCase = new BuscarClientePorIdUseCase(clienteRepository);
const clienteController = new ClienteController(
  registrarClienteUseCase,
  listarClientesUseCase,
  buscarClientePorIdUseCase,
);

export const clientesRouter = Router();

clientesRouter.post('/', clienteController.registrar);
clientesRouter.get('/', clienteController.listar);
clientesRouter.get('/:id', clienteController.buscarPorId);

// Se exporta también el repositorio para poder reutilizarlo desde el módulo de Citas
export { clienteRepository };
