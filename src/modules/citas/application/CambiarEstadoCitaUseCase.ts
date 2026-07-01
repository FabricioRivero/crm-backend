import { Cita } from '../domain/Cita';
import { CitaRepository } from '../domain/CitaRepository';
import { DomainError } from '../../../shared/domain/DomainError';

export type AccionCita = 'confirmar' | 'completar' | 'cancelar';

export class CambiarEstadoCitaUseCase {
  constructor(private readonly citaRepository: CitaRepository) {}

  public async ejecutar(citaId: string, accion: AccionCita): Promise<Cita> {
    const cita = await this.citaRepository.buscarPorId(citaId);
    if (!cita) {
      throw new DomainError(`No existe una cita con id ${citaId}`);
    }

    if (accion === 'confirmar') cita.confirmar();
    else if (accion === 'completar') cita.completar();
    else if (accion === 'cancelar') cita.cancelar();

    await this.citaRepository.guardar(cita);
    return cita;
  }
}
