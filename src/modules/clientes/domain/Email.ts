import { DomainError } from '../../../shared/domain/DomainError';

/**
 * Value Object: Email
 * Un Value Object no tiene identidad propia, se compara por su valor,
 * y es inmutable. Se autovalida en el constructor.
 */
export class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!Email.esValido(value)) {
      throw new DomainError(`El email "${value}" no tiene un formato válido`);
    }
    this.value = value.toLowerCase().trim();
  }

  private static esValido(value: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: Email): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
