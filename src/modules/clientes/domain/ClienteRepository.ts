import { Cliente } from './Cliente';

/**
 * PUERTO (Port). El dominio y la capa de aplicación dependen de esta
 * interfaz, nunca de una implementación concreta (MongoDB, SQL, etc.).
 * Esto es lo que permite cambiar de base de datos sin tocar la lógica
 * de negocio: Inversión de Dependencias.
 */
export interface ClienteRepository {
  guardar(cliente: Cliente): Promise<void>;
  buscarPorId(id: string): Promise<Cliente | null>;
  buscarPorEmail(email: string): Promise<Cliente | null>;
  listarTodos(): Promise<Cliente[]>;
  eliminar(id: string): Promise<void>;
}