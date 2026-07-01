import { DomainError } from '../../../shared/domain/DomainError';

export enum EstadoCitaEnum {
  PENDIENTE = 'PENDIENTE',
  CONFIRMADA = 'CONFIRMADA',
  COMPLETADA = 'COMPLETADA',
  CANCELADA = 'CANCELADA',
}

/**
 * Value Object que encapsula el estado de una cita Y las reglas
 * de qué transiciones son válidas. Esto es lógica de negocio pura,
 * no un simple string.
 */
export class EstadoCita {
  private readonly estado: EstadoCitaEnum;

  private static readonly TRANSICIONES_VALIDAS: Record<EstadoCitaEnum, EstadoCitaEnum[]> = {
    [EstadoCitaEnum.PENDIENTE]: [EstadoCitaEnum.CONFIRMADA, EstadoCitaEnum.CANCELADA],
    [EstadoCitaEnum.CONFIRMADA]: [EstadoCitaEnum.COMPLETADA, EstadoCitaEnum.CANCELADA],
    [EstadoCitaEnum.COMPLETADA]: [],
    [EstadoCitaEnum.CANCELADA]: [],
  };

  constructor(estado: EstadoCitaEnum = EstadoCitaEnum.PENDIENTE) {
    this.estado = estado;
  }

  public getValue(): EstadoCitaEnum {
    return this.estado;
  }

  public puedeTransicionarA(nuevoEstado: EstadoCitaEnum): boolean {
    return EstadoCita.TRANSICIONES_VALIDAS[this.estado].includes(nuevoEstado);
  }

  public transicionarA(nuevoEstado: EstadoCitaEnum): EstadoCita {
    if (!this.puedeTransicionarA(nuevoEstado)) {
      throw new DomainError(
        `No se puede pasar de "${this.estado}" a "${nuevoEstado}"`,
      );
    }
    return new EstadoCita(nuevoEstado);
  }

  public equals(other: EstadoCita): boolean {
    return this.estado === other.estado;
  }
}
