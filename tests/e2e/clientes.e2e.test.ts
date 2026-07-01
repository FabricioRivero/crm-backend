import request from 'supertest';
import { crearApp } from '../../src/app';

/**
 * Tests E2E (API): levantan la app Express real (sin mocks) y golpean
 * los endpoints HTTP tal cual lo haría un cliente. Verifican el flujo
 * completo: ruta -> controlador -> caso de uso -> dominio -> repositorio.
 */
describe('E2E: /api/clientes', () => {
  const app = crearApp();

  it('GET /health responde ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('POST /api/clientes crea un cliente y devuelve 201', async () => {
    const res = await request(app).post('/api/clientes').send({
      nombre: 'Carla',
      apellido: 'Gómez',
      email: 'carla@correo.com',
      telefono: '70099887',
    });

    expect(res.status).toBe(201);
    expect(res.body.nombre).toBe('Carla');
    expect(res.body.email).toBe('carla@correo.com');
  });

  it('POST /api/clientes con email duplicado devuelve 400', async () => {
    await request(app).post('/api/clientes').send({
      nombre: 'Duplicado',
      apellido: 'Uno',
      email: 'duplicado@correo.com',
      telefono: '70000001',
    });

    const res = await request(app).post('/api/clientes').send({
      nombre: 'Duplicado',
      apellido: 'Dos',
      email: 'duplicado@correo.com',
      telefono: '70000002',
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Ya existe');
  });

  it('GET /api/clientes lista los clientes creados', async () => {
    const res = await request(app).get('/api/clientes');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /api/clientes/:id devuelve 404 si no existe', async () => {
    const res = await request(app).get('/api/clientes/no-existe');
    expect(res.status).toBe(404);
  });
});
