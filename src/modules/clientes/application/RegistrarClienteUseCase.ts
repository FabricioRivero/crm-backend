import { randomUUID as uuid } from 'crypto';
import { Cliente, TipoCliente } from '../domain/Cliente';
import { ClienteRepository } from '../domain/ClienteRepository';
import { Email } from '../domain/Email';
import { Telefono } from '../domain/Telefono';
import { DomainError } from '../../../shared/domain/DomainError';

export interface RegistrarClienteDTO {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  tipo?: TipoCliente;
}

/**
 * Caso de uso: orquesta el dominio y el puerto de persistencia.
 * NO conoce Express, ni HTTP, ni la base de datos concreta.
 */
export class RegistrarClienteUseCase {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  public async ejecutar(dto: RegistrarClienteDTO): Promise<Cliente> {
    const emailVO = new Email(dto.email);

    const existente = await this.clienteRepository.buscarPorEmail(emailVO.getValue());
    if (existente) {
      throw new DomainError(`Ya existe un cliente registrado con el email ${dto.email}`);
    }

    const cliente = new Cliente(
      uuid(),
      dto.nombre,
      dto.apellido,
      emailVO,
      new Telefono(dto.telefono),
      dto.tipo ?? 'NUEVO',
    );

    await this.clienteRepository.guardar(cliente);
    return cliente;
  }
}
