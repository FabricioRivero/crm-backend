import { Persona } from '../../../shared/domain/Persona';
import { Email } from './Email';
import { Telefono } from './Telefono';

export type TipoCliente = 'REGULAR' | 'VIP' | 'NUEVO';

/**
 * Entidad Cliente. A diferencia de un Value Object, SÍ tiene identidad
 * (su id) y su ciclo de vida importa: dos clientes con los mismos datos
 * pero distinto id son entidades distintas.
 */
export class Cliente extends Persona {
  private email: Email;
  private telefono: Telefono;
  private tipo: TipoCliente;
  private historialCitasIds: string[];
  private activo: boolean;

  constructor(
    id: string,
    nombre: string,
    apellido: string,
    email: Email,
    telefono: Telefono,
    tipo: TipoCliente = 'NUEVO',
  ) {
    super(id, nombre, apellido);
    this.email = email;
    this.telefono = telefono;
    this.tipo = tipo;
    this.historialCitasIds = [];
    this.activo = true;
  }

  public getRol(): string {
    return 'Cliente';
  }

  public getEmail(): Email {
    return this.email;
  }

  public getTelefono(): Telefono {
    return this.telefono;
  }

  public getTipo(): TipoCliente {
    return this.tipo;
  }

  public estaActivo(): boolean {
    return this.activo;
  }

  public agregarCitaAlHistorial(citaId: string): void {
    if (!this.historialCitasIds.includes(citaId)) {
      this.historialCitasIds.push(citaId);
    }
  }

  public getHistorialCitas(): string[] {
    return [...this.historialCitasIds];
  }

  public ascenderAVip(): void {
    this.tipo = 'VIP';
  }

  public desactivar(): void {
    this.activo = false;
  }

  public toPrimitives() {
    return {
      id: this.id,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email.getValue(),
      telefono: this.telefono.getValue(),
      tipo: this.tipo,
      activo: this.activo,
      historialCitas: this.historialCitasIds,
    };
  }
}
