import { RegistrarClienteUseCase } from '../../../src/modules/clientes/application/RegistrarClienteUseCase';
import { ClienteRepository } from '../../../src/modules/clientes/domain/ClienteRepository';
import { Cliente } from '../../../src/modules/clientes/domain/Cliente';
import { DomainError } from '../../../src/shared/domain/DomainError';

// Mock manual del puerto: así se testea el caso de uso SIN infraestructura real.
function crearRepositorioMock(): jest.Mocked<ClienteRepository> {
  return {
    guardar: jest.fn(),
    buscarPorId: jest.fn(),
    buscarPorEmail: jest.fn(),
    listarTodos: jest.fn(),
    eliminar: jest.fn(),
  };
}

describe('RegistrarClienteUseCase', () => {
  it('registra un cliente nuevo correctamente', async () => {
    const repo = crearRepositorioMock();
    repo.buscarPorEmail.mockResolvedValue(null);

    const useCase = new RegistrarClienteUseCase(repo);
    const cliente = await useCase.ejecutar({
      nombre: 'Luis',
      apellido: 'Rivero',
      email: 'luis@correo.com',
      telefono: '70011122',
    });

    expect(cliente).toBeInstanceOf(Cliente);
    expect(repo.guardar).toHaveBeenCalledTimes(1);
  });

  it('lanza DomainError si el email ya existe', async () => {
    const repo = crearRepositorioMock();
    repo.buscarPorEmail.mockResolvedValue(
      new Cliente(
        'existing',
        'Otro',
        'Cliente',
        { getValue: () => 'luis@correo.com' } as any,
        { getValue: () => '70000000' } as any,
      ),
    );

    const useCase = new RegistrarClienteUseCase(repo);

    await expect(
      useCase.ejecutar({
        nombre: 'Luis',
        apellido: 'Rivero',
        email: 'luis@correo.com',
        telefono: '70011122',
      }),
    ).rejects.toThrow(DomainError);

    expect(repo.guardar).not.toHaveBeenCalled();
  });
});