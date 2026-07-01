import { Request, Response } from 'express';
import { RegistrarClienteUseCase } from '../application/RegistrarClienteUseCase';
import { ListarClientesUseCase } from '../application/ListarClientesUseCase';
import { BuscarClientePorIdUseCase } from '../application/BuscarClientePorIdUseCase';
import { DomainError } from '../../../shared/domain/DomainError';

/**
 * ADAPTADOR de entrada (driving adapter). Traduce HTTP <-> casos de uso.
 * No contiene lógica de negocio, solo orquesta la petición/respuesta.
 */
export class ClienteController {
  constructor(
    private readonly registrarClienteUseCase: RegistrarClienteUseCase,
    private readonly listarClientesUseCase: ListarClientesUseCase,
    private readonly buscarClientePorIdUseCase: BuscarClientePorIdUseCase,
  ) {}

  public registrar = async (req: Request, res: Response): Promise<void> => {
    try {
      const cliente = await this.registrarClienteUseCase.ejecutar(req.body);
      res.status(201).json(cliente.toPrimitives());
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  public listar = async (_req: Request, res: Response): Promise<void> => {
    try {
      const clientes = await this.listarClientesUseCase.ejecutar();
      res.status(200).json(clientes.map((c) => c.toPrimitives()));
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  public buscarPorId = async (req: Request, res: Response): Promise<void> => {
    try {
      const cliente = await this.buscarClientePorIdUseCase.ejecutar(String(req.params.id));
      res.status(200).json(cliente.toPrimitives());
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
}
