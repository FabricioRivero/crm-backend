import { Cita } from './Cita';

export interface CitaRepository {
  guardar(cita: Cita): Promise<void>;
  buscarPorId(id: string): Promise<Cita | null>;
  listarTodas(): Promise<Cita[]>;
  listarPorCliente(clienteId: string): Promise<Cita[]>;
  listarPorEmpleadoYFecha(empleadoId: string, fecha: Date): Promise<Cita[]>;
  eliminar(id: string): Promise<void>;
}