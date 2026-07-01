import { v4 as uuid } from 'uuid';
import { Cliente } from '../domain/Cliente';
import { Email } from '../domain/Email';
import { Telefono } from '../domain/Telefono';
import { ClienteRepository } from '../domain/ClienteRepository';
import { DomainError } from '../../../shared/domain/DomainError';

export interface RegistrarClienteDTO {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  tipo?: 'REGULAR' | 'VIP' | 'NUEVO';
}

export class RegistrarClienteUseCase {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  public async ejecutar(dto: RegistrarClienteDTO): Promise<Cliente> {
    const emailExistente = await this.clienteRepository.buscarPorEmail(dto.email);
    if (emailExistente) {
      throw new DomainError(`Ya existe un cliente con el email: ${dto.email}`);
    }

    const cliente = new Cliente(
      uuid(),
      dto.nombre,
      dto.apellido,
      new Email(dto.email),
      new Telefono(dto.telefono),
      dto.tipo || 'NUEVO',
    );

    await this.clienteRepository.guardar(cliente);
    return cliente;
  }
}