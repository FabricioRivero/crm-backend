import { Cita } from '../domain/Cita';
import { CitaRepository } from '../domain/CitaRepository';

export class InMemoryCitaRepository implements CitaRepository {
  private citas: Map<string, Cita> = new Map();

  public async guardar(cita: Cita): Promise<void> {
    this.citas.set(cita.getId(), cita);
  }

  public async buscarPorId(id: string): Promise<Cita | null> {
    return this.citas.get(id) ?? null;
  }

  public async listarTodas(): Promise<Cita[]> {
    return Array.from(this.citas.values());
  }

  public async listarPorCliente(clienteId: string): Promise<Cita[]> {
    return Array.from(this.citas.values()).filter((c) => c.getClienteId() === clienteId);
  }

  public async listarPorEmpleadoYFecha(empleadoId: string, fecha: Date): Promise<Cita[]> {
    const mismoDia = (a: Date, b: Date) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();

    return Array.from(this.citas.values()).filter(
      (c) => c.getEmpleadoId() === empleadoId && mismoDia(c.getFechaHora(), fecha),
    );
  }

  public async eliminar(id: string): Promise<void> {
    this.citas.delete(id);
  }
}