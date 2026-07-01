import { DomainError } from './DomainError';

/**
 * Clase abstracta base. Aplica Abstracción + prepara el terreno
 * para Herencia (Cliente, Empleado) y Polimorfismo (getRol()).
 */
export abstract class Persona {
  protected readonly id: string;
  protected nombre: string;
  protected apellido: string;

  constructor(id: string, nombre: string, apellido: string) {
    if (!nombre || nombre.trim().length === 0) {
      throw new DomainError('El nombre no puede estar vacío');
    }
    if (!apellido || apellido.trim().length === 0) {
      throw new DomainError('El apellido no puede estar vacío');
    }
    this.id = id;
    this.nombre = nombre.trim();
    this.apellido = apellido.trim();
  }

  public getId(): string {
    return this.id;
  }

  public getNombreCompleto(): string {
    return `${this.nombre} ${this.apellido}`;
  }

  /** Polimorfismo: cada subclase define su propio rol */
  public abstract getRol(): string;
}
