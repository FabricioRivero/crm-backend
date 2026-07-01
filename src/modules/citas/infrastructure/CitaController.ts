import { Request, Response } from 'express';
import { AgendarCitaUseCase } from '../application/AgendarCitaUseCase';
import { CambiarEstadoCitaUseCase, AccionCita } from '../application/CambiarEstadoCitaUseCase';
import { ListarCitasUseCase } from '../application/ListarCitasUseCase';
import { DomainError } from '../../../shared/domain/DomainError';

export class CitaController {
  constructor(
    private readonly agendarCitaUseCase: AgendarCitaUseCase,
    private readonly cambiarEstadoCitaUseCase: CambiarEstadoCitaUseCase,
    private readonly listarCitasUseCase: ListarCitasUseCase,
  ) {}

  public agendar = async (req: Request, res: Response): Promise<void> => {
    try {
      const cita = await this.agendarCitaUseCase.ejecutar(req.body);
      res.status(201).json(cita.toPrimitives());
    } catch (error) {
      this.manejarError(error, res);
    }
  };

  public cambiarEstado = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(req.params.id);
      const { accion } = req.body as { accion: AccionCita };
      const cita = await this.cambiarEstadoCitaUseCase.ejecutar(id, accion);
      res.status(200).json(cita.toPrimitives());
    } catch (error) {
      this.manejarError(error, res);
    }
  };

  public listar = async (req: Request, res: Response): Promise<void> => {
    try {
      const clienteId = req.query.clienteId as string | undefined;
      const citas = await this.listarCitasUseCase.ejecutar(clienteId);
      res.status(200).json(citas.map((c) => c.toPrimitives()));
    } catch (error) {
      this.manejarError(error, res);
    }
  };

  private manejarError(error: unknown, res: Response): void {
    if (error instanceof DomainError) {
      res.status(400).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
