import { BuscarClientePorIdUseCase } from '../../../src/modules/clientes/application/BuscarClientePorIdUseCase';
import { ClienteRepository } from '../../../src/modules/clientes/domain/ClienteRepository';
import { Cliente } from '../../../src/modules/clientes/domain/Cliente';
import { Email } from '../../../src/modules/clientes/domain/Email';
import { Telefono } from '../../../src/modules/clientes/domain/Telefono';
import { DomainError } from '../../../src/shared/domain/DomainError';

function crearRepositorioMock(): jest.Mocked<ClienteRepository> {
  return {
    guardar: jest.fn(),
    buscarPorId: jest.fn(),
    buscarPorEmail: jest.fn(),
    listarTodos: jest.fn(),
    eliminar: jest.fn(),
  };
}

describe('BuscarClientePorIdUseCase', () => {
  it('devuelve el cliente si existe', async () => {
    const repo = crearRepositorioMock();
    const cliente = new Cliente(
      '1',
      'Ana',
      'Pérez',
      new Email('ana@correo.com'),
      new Telefono('70012345'),
    );
    repo.buscarPorId.mockResolvedValue(cliente);

    const useCase = new BuscarClientePorIdUseCase(repo);
    const resultado = await useCase.ejecutar('1');

    expect(resultado.getId()).toBe('1');
  });

  it('lanza DomainError si el cliente no existe', async () => {
    const repo = crearRepositorioMock();
    repo.buscarPorId.mockResolvedValue(null);

    const useCase = new BuscarClientePorIdUseCase(repo);

    await expect(useCase.ejecutar('no-existe')).rejects.toThrow(DomainError);
  });
});
