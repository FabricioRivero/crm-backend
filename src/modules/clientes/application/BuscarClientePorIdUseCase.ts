import { Cliente } from '../domain/Cliente';
import { ClienteRepository } from '../domain/ClienteRepository';
import { DomainError } from '../../../shared/domain/DomainError';

export class BuscarClientePorIdUseCase {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  public async ejecutar(id: string): Promise<Cliente> {
    const cliente = await this.clienteRepository.buscarPorId(id);
    if (!cliente) {
      throw new DomainError(`No existe un cliente con id ${id}`);
    }
    return cliente;
  }
}
