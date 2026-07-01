import { Empleado } from './Empleado';

export interface EmpleadoRepository {
  guardar(empleado: Empleado): Promise<void>;
  buscarPorId(id: string): Promise<Empleado | null>;
  listarTodos(): Promise<Empleado[]>;
  listarPorEspecialidad(especialidad: string): Promise<Empleado[]>;
  eliminar(id: string): Promise<void>;
}