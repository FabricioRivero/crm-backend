import { Cliente } from '../domain/Cliente';
import { ClienteRepository } from '../domain/ClienteRepository';

export class ListarClientesUseCase {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  public async ejecutar(): Promise<Cliente[]> {
    return this.clienteRepository.listarTodos();
  }
}
