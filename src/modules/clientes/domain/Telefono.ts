import { DomainError } from '../../../shared/domain/DomainError';

/**
 * Value Object: Teléfono
 */
export class Telefono {
  private readonly value: string;

  constructor(telefono: string) {
    const limpio = telefono.replace(/\s/g, '');
    if (limpio.length < 7) {
      throw new DomainError(`Teléfono demasiado corto: "${telefono}"`);
    }
    this.value = limpio;
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: Telefono): boolean {
    return this.value === other.value;
  }
}