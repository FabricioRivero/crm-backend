import { EstadoCita, EstadoCitaEnum } from '../../../src/modules/citas/domain/EstadoCita';
import { DomainError } from '../../../src/shared/domain/DomainError';

describe('Value Object: EstadoCita', () => {
  it('inicia en PENDIENTE por defecto', () => {
    const estado = new EstadoCita();
    expect(estado.getValue()).toBe(EstadoCitaEnum.PENDIENTE);
  });

  it('permite transición de PENDIENTE a CONFIRMADA', () => {
    const estado = new EstadoCita(EstadoCitaEnum.PENDIENTE);
    const nuevo = estado.transicionarA(EstadoCitaEnum.CONFIRMADA);
    expect(nuevo.getValue()).toBe(EstadoCitaEnum.CONFIRMADA);
  });

  it('no permite transición de PENDIENTE a COMPLETADA directamente', () => {
    const estado = new EstadoCita(EstadoCitaEnum.PENDIENTE);
    expect(() => estado.transicionarA(EstadoCitaEnum.COMPLETADA)).toThrow(DomainError);
  });

  it('no permite ninguna transición desde CANCELADA (estado final)', () => {
    const estado = new EstadoCita(EstadoCitaEnum.CANCELADA);
    expect(estado.puedeTransicionarA(EstadoCitaEnum.CONFIRMADA)).toBe(false);
    expect(estado.puedeTransicionarA(EstadoCitaEnum.COMPLETADA)).toBe(false);
  });

  it('permite el flujo completo PENDIENTE -> CONFIRMADA -> COMPLETADA', () => {
    let estado = new EstadoCita();
    estado = estado.transicionarA(EstadoCitaEnum.CONFIRMADA);
    estado = estado.transicionarA(EstadoCitaEnum.COMPLETADA);
    expect(estado.getValue()).toBe(EstadoCitaEnum.COMPLETADA);
  });
});