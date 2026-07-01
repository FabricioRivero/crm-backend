import { Persona } from '../../../shared/domain/Persona';

export type Especialidad = 'BARBERO' | 'ESTILISTA' | 'MEDICO' | 'MECANICO' | 'GENERAL';

/**
 * Entidad Empleado. Hereda de Persona y añade especialidades y disponibilidad.
 */
export class Empleado extends Persona {
  private especialidades: Especialidad[];
  private disponible: boolean;

  constructor(
    id: string,
    nombre: string,
    apellido: string,
    especialidades: Especialidad[] = ['GENERAL'],
  ) {
    super(id, nombre, apellido);
    this.especialidades = especialidades;
    this.disponible = true;
  }

  public getRol(): string {
    return 'Empleado';
  }

  public getEspecialidades(): Especialidad[] {
    return [...this.especialidades];
  }

  public agregarEspecialidad(esp: Especialidad): void {
    if (!this.especialidades.includes(esp)) {
      this.especialidades.push(esp);
    }
  }

  public estaDisponible(): boolean {
    return this.disponible;
  }

  public setDisponible(disponible: boolean): void {
    this.disponible = disponible;
  }

  public toPrimitives() {
    return {
      id: this.id,
      nombre: this.nombre,
      apellido: this.apellido,
      especialidades: this.especialidades,
      disponible: this.disponible,
      rol: this.getRol(),
    };
  }
}