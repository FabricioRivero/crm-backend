import { DomainError } from '../../../shared/domain/DomainError';

export class Telefono {
  private readonly value: string;

  constructor(value: string) {
    const limpio = value.replace(/[\s-]/g, '');
    if (!/^\+?\d{7,15}$/.test(limpio)) {
      throw new DomainError(`El teléfono "${value}" no es válido`);
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
