import { DomainError } from '../../../shared/domain/DomainError';
import { EstadoCita, EstadoCitaEnum } from './EstadoCita';

export class Cita {
  private readonly id: string;
  private readonly clienteId: string;
  private readonly empleadoId: string;
  private readonly servicioId: string;
  private readonly fechaHora: Date;
  private estado: EstadoCita;
  private notas: string;

  constructor(
    id: string,
    clienteId: string,
    empleadoId: string,
    servicioId: string,
    fechaHora: Date,
    estado: EstadoCita = new EstadoCita(),
    notas: string = '',
  ) {
    if (fechaHora.getTime() < Date.now() - 60_000) {
      throw new DomainError('No se puede agendar una cita en el pasado');
    }
    this.id = id;
    this.clienteId = clienteId;
    this.empleadoId = empleadoId;
    this.servicioId = servicioId;
    this.fechaHora = fechaHora;
    this.estado = estado;
    this.notas = notas;
  }

  public getId(): string { return this.id; }
  public getClienteId(): string { return this.clienteId; }
  public getEmpleadoId(): string { return this.empleadoId; }
  public getServicioId(): string { return this.servicioId; }
  public getFechaHora(): Date { return this.fechaHora; }
  public getEstado(): EstadoCita { return this.estado; }

  public confirmar(): void {
    this.estado = this.estado.transicionarA(EstadoCitaEnum.CONFIRMADA);
  }

  public completar(): void {
    this.estado = this.estado.transicionarA(EstadoCitaEnum.COMPLETADA);
  }

  public cancelar(): void {
    this.estado = this.estado.transicionarA(EstadoCitaEnum.CANCELADA);
  }

  public seSuperponeCon(otraFechaHora: Date, duracionMinutos: number): boolean {
    const inicioA = this.fechaHora.getTime();
    const finA = inicioA + duracionMinutos * 60_000;
    const inicioB = otraFechaHora.getTime();
    const finB = inicioB + duracionMinutos * 60_000;
    return inicioA < finB && inicioB < finA;
  }

  public toPrimitives() {
    return {
      id: this.id,
      clienteId: this.clienteId,
      empleadoId: this.empleadoId,
      servicioId: this.servicioId,
      fechaHora: this.fechaHora.toISOString(),
      estado: this.estado.getValue(),
      notas: this.notas,
    };
  }
}