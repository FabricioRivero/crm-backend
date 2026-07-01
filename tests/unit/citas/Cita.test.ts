import { Cita } from '../../../src/modules/citas/domain/Cita';
import { DomainError } from '../../../src/shared/domain/DomainError';

describe('Entidad: Cita', () => {
  const fechaFutura = () => new Date(Date.now() + 24 * 60 * 60 * 1000);

  it('se crea en estado PENDIENTE', () => {
    const cita = new Cita('1', 'cli-1', 'emp-1', 'srv-1', fechaFutura());
    expect(cita.getEstado().getValue()).toBe('PENDIENTE');
  });

  it('no permite agendar en el pasado', () => {
    const fechaPasada = new Date(Date.now() - 60 * 60 * 1000);
    expect(() => new Cita('1', 'cli-1', 'emp-1', 'srv-1', fechaPasada)).toThrow(DomainError);
  });

  it('confirmar() cambia el estado a CONFIRMADA', () => {
    const cita = new Cita('1', 'cli-1', 'emp-1', 'srv-1', fechaFutura());
    cita.confirmar();
    expect(cita.getEstado().getValue()).toBe('CONFIRMADA');
  });

  it('no permite completar una cita que no fue confirmada', () => {
    const cita = new Cita('1', 'cli-1', 'emp-1', 'srv-1', fechaFutura());
    expect(() => cita.completar()).toThrow(DomainError);
  });

  it('detecta solapamiento de horarios', () => {
    const hora = fechaFutura();
    const cita = new Cita('1', 'cli-1', 'emp-1', 'srv-1', hora);
    const mismaHora = new Date(hora);
    expect(cita.seSuperponeCon(mismaHora, 30)).toBe(true);
  });

  it('no detecta solapamiento si los horarios no se cruzan', () => {
    const hora = fechaFutura();
    const cita = new Cita('1', 'cli-1', 'emp-1', 'srv-1', hora);
    const horaDistinta = new Date(hora.getTime() + 3 * 60 * 60 * 1000);
    expect(cita.seSuperponeCon(horaDistinta, 30)).toBe(false);
  });
});
