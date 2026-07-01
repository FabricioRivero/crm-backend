import { InMemoryCitaRepository } from '../../src/modules/citas/infrastructure/InMemoryCitaRepository';
import { Cita } from '../../src/modules/citas/domain/Cita';

/**
 * Test de INTEGRACIÓN: a diferencia del unitario, aquí probamos la
 * implementación real del adaptador (no un mock), verificando que
 * cumple el contrato del puerto CitaRepository correctamente.
 */
describe('InMemoryCitaRepository (integración)', () => {
  let repositorio: InMemoryCitaRepository;

  beforeEach(() => {
    repositorio = new InMemoryCitaRepository();
  });

  it('guarda y recupera una cita por id', async () => {
    const fecha = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const cita = new Cita('c1', 'cli-1', 'emp-1', 'srv-1', fecha);

    await repositorio.guardar(cita);
    const encontrada = await repositorio.buscarPorId('c1');

    expect(encontrada).not.toBeNull();
    expect(encontrada?.getId()).toBe('c1');
  });

  it('devuelve null si la cita no existe', async () => {
    const resultado = await repositorio.buscarPorId('no-existe');
    expect(resultado).toBeNull();
  });

  it('filtra correctamente por cliente', async () => {
    const fecha = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await repositorio.guardar(new Cita('c1', 'cli-1', 'emp-1', 'srv-1', fecha));
    await repositorio.guardar(new Cita('c2', 'cli-2', 'emp-1', 'srv-1', fecha));

    const citasDeCliente1 = await repositorio.listarPorCliente('cli-1');
    expect(citasDeCliente1).toHaveLength(1);
    expect(citasDeCliente1[0].getId()).toBe('c1');
  });

  it('filtra correctamente por empleado y fecha (mismo día)', async () => {
    const fecha = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const otroDia = new Date(fecha.getTime() + 5 * 24 * 60 * 60 * 1000);

    await repositorio.guardar(new Cita('c1', 'cli-1', 'emp-1', 'srv-1', fecha));
    await repositorio.guardar(new Cita('c2', 'cli-2', 'emp-1', 'srv-1', otroDia));

    const citasDelDia = await repositorio.listarPorEmpleadoYFecha('emp-1', fecha);
    expect(citasDelDia).toHaveLength(1);
    expect(citasDelDia[0].getId()).toBe('c1');
  });
});
