import { DomainError } from '../../../shared/domain/DomainError';

export type EspecialidadTipo =
  | 'BARBERIA'
  | 'ESTETICA'
  | 'MEDICINA_GENERAL'
  | 'MECANICA'
  | 'OTRO';

export class Especialidad {
  private readonly tipo: EspecialidadTipo;

  constructor(tipo: string) {
    const tipoNormalizado = tipo.toUpperCase().trim() as EspecialidadTipo;
    const validas: EspecialidadTipo[] = [
      'BARBERIA',
      'ESTETICA',
      'MEDICINA_GENERAL',
      'MECANICA',
      'OTRO',
    ];
    if (!validas.includes(tipoNormalizado)) {
      throw new DomainError(`Especialidad "${tipo}" no reconocida`);
    }
    this.tipo = tipoNormalizado;
  }

  public getValue(): EspecialidadTipo {
    return this.tipo;
  }
}
