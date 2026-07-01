import { Cliente } from '../../../src/modules/clientes/domain/Cliente';
import { Email } from '../../../src/modules/clientes/domain/Email';
import { Telefono } from '../../../src/modules/clientes/domain/Telefono';
import { DomainError } from '../../../src/shared/domain/DomainError';

describe('Value Object: Email', () => {
  it('crea un email válido correctamente', () => {
    const email = new Email('Test@Correo.com');
    expect(email.getValue()).toBe('test@correo.com');
  });

  it('lanza DomainError con un email inválido', () => {
    expect(() => new Email('no-es-un-email')).toThrow(DomainError);
  });

  it('dos emails con el mismo valor son iguales', () => {
    const a = new Email('a@a.com');
    const b = new Email('A@A.com');
    expect(a.equals(b)).toBe(true);
  });
});

describe('Value Object: Telefono', () => {
  it('acepta un teléfono válido', () => {
    expect(() => new Telefono('+591 700 12345')).not.toThrow();
  });

  it('rechaza un teléfono demasiado corto', () => {
    expect(() => new Telefono('123')).toThrow(DomainError);
  });
});

describe('Entidad: Cliente', () => {
  const crearClienteDePrueba = () =>
    new Cliente(
      '1',
      'Ana',
      'Pérez',
      new Email('ana@correo.com'),
      new Telefono('70012345'),
    );

  it('se crea con tipo NUEVO por defecto', () => {
    const cliente = crearClienteDePrueba();
    expect(cliente.getTipo()).toBe('NUEVO');
    expect(cliente.getRol()).toBe('Cliente'); // Polimorfismo
  });

  it('lanza error si el nombre está vacío', () => {
    expect(
      () => new Cliente('1', '', 'Pérez', new Email('a@a.com'), new Telefono('70012345')),
    ).toThrow(DomainError);
  });

  it('permite ascender a VIP', () => {
    const cliente = crearClienteDePrueba();
    cliente.ascenderAVip();
    expect(cliente.getTipo()).toBe('VIP');
  });

  it('agrega citas al historial sin duplicar', () => {
    const cliente = crearClienteDePrueba();
    cliente.agregarCitaAlHistorial('cita-1');
    cliente.agregarCitaAlHistorial('cita-1');
    expect(cliente.getHistorialCitas()).toEqual(['cita-1']);
  });

  it('se puede desactivar', () => {
    const cliente = crearClienteDePrueba();
    expect(cliente.estaActivo()).toBe(true);
    cliente.desactivar();
    expect(cliente.estaActivo()).toBe(false);
  });
});