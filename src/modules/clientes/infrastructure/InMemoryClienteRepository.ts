import { Cliente } from '../domain/Cliente';
import { ClienteRepository } from '../domain/ClienteRepository';

/**
 * ADAPTADOR (Adapter). Implementa el puerto ClienteRepository.
 * Aquí usamos memoria para simplificar, pero se podría reemplazar
 * por MongoClienteRepository o SqlClienteRepository sin tocar
 * el dominio ni los casos de uso.
 */
export class InMemoryClienteRepository implements ClienteRepository {
  private clientes: Map<string, Cliente> = new Map();

  public async guardar(cliente: Cliente): Promise<void> {
    this.clientes.set(cliente.getId(), cliente);
  }

  public async buscarPorId(id: string): Promise<Cliente | null> {
    return this.clientes.get(id) ?? null;
  }

  public async buscarPorEmail(email: string): Promise<Cliente | null> {
    for (const cliente of this.clientes.values()) {
      if (cliente.getEmail().getValue() === email.toLowerCase().trim()) {
        return cliente;
      }
    }
    return null;
  }

  public async listarTodos(): Promise<Cliente[]> {
    return Array.from(this.clientes.values());
  }

  public async eliminar(id: string): Promise<void> {
    this.clientes.delete(id);
  }
}
