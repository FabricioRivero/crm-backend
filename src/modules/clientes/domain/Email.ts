import { DomainError } from '../../../shared/domain/DomainError';

/**
 * Value Object: Email
 * Inmutable, sin identidad propia. Dos emails con el mismo valor son iguales.
 */
export class Email {
  private readonly value: string;

  constructor(email: string) {
    const normalized = email.toLowerCase().trim();
    if (!this.esValido(normalized)) {
      throw new DomainError(`Email inválido: "${email}"`);
    }
    this.value = normalized;
  }

  private esValido(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: Email): boolean {
    return this.value === other.value;
  }
}