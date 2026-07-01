import { Empleado } from './Empleado';

export interface EmpleadoRepository {
  guardar(empleado: Empleado): Promise<void>;
  buscarPorId(id: string): Promise<Empleado | null>;
  listarTodos(): Promise<Empleado[]>;
  listarDisponibles(): Promise<Empleado[]>;
}
