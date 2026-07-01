/**
 * Error base para violaciones de reglas de negocio.
 * Todas las excepciones de dominio deben extender esta clase,
 * NUNCA lanzar Error genérico desde el dominio.
 */
export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}
