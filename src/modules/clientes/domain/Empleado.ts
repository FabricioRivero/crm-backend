import { Persona } from '../../../shared/domain/Persona';
import { Especialidad } from './Especialidad';

export class Empleado extends Persona {
  private especialidad: Especialidad;
  private disponible: boolean;

  constructor(
    id: string,
    nombre: string,
    apellido: string,
    especialidad: Especialidad,
    disponible: boolean = true,
  ) {
    super(id, nombre, apellido);
    this.especialidad = especialidad;
    this.disponible = disponible;
  }

  /** Polimorfismo: distinto de Cliente.getRol() */
  public getRol(): string {
    return 'Empleado';
  }

  public getEspecialidad(): Especialidad {
    return this.especialidad;
  }

  public estaDisponible(): boolean {
    return this.disponible;
  }

  public marcarNoDisponible(): void {
    this.disponible = false;
  }

  public marcarDisponible(): void {
    this.disponible = true;
  }

  public toPrimitives() {
    return {
      id: this.id,
      nombre: this.nombre,
      apellido: this.apellido,
      especialidad: this.especialidad.getValue(),
      disponible: this.disponible,
      rol: this.getRol(),
    };
  }
}
