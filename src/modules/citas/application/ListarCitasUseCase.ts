import { Cita } from '../domain/Cita';
import { CitaRepository } from '../domain/CitaRepository';

export class ListarCitasUseCase {
  constructor(private readonly citaRepository: CitaRepository) {}

  public async ejecutar(clienteId?: string): Promise<Cita[]> {
    if (clienteId) {
      return this.citaRepository.listarPorCliente(clienteId);
    }
    return this.citaRepository.listarTodas();
  }
}