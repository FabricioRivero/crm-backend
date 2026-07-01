import { v4 as uuid } from 'uuid';
import { Cita } from '../domain/Cita';
import { CitaRepository } from '../domain/CitaRepository';
import { DomainError } from '../../../shared/domain/DomainError';

export interface AgendarCitaDTO {
  clienteId: string;
  empleadoId: string;
  servicioId: string;
  fechaHora: string; // ISO string
  duracionMinutos: number;
  notas?: string;
}

export class AgendarCitaUseCase {
  constructor(private readonly citaRepository: CitaRepository) {}

  public async ejecutar(dto: AgendarCitaDTO): Promise<Cita> {
    const fechaHora = new Date(dto.fechaHora);

    const citasDelEmpleado = await this.citaRepository.listarPorEmpleadoYFecha(
      dto.empleadoId,
      fechaHora,
    );

    const cita = new Cita(
      uuid(),
      dto.clienteId,
      dto.empleadoId,
      dto.servicioId,
      fechaHora,
      undefined,
      dto.notas || '',
    );

    const haySolapamiento = citasDelEmpleado.some((c) =>
      c.seSuperponeCon(fechaHora, dto.duracionMinutos),
    );
    if (haySolapamiento) {
      throw new DomainError('El empleado ya tiene una cita agendada en ese horario');
    }

    await this.citaRepository.guardar(cita);
    return cita;
  }
}