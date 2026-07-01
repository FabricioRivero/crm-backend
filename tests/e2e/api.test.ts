import request from 'supertest';
import { crearApp } from '../../src/app';

describe('API E2E Tests', () => {
  const app = crearApp();

  it('GET /health devuelve status ok', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('POST /api/clientes crea un cliente', async () => {
    const response = await request(app)
      .post('/api/clientes')
      .send({
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan@test.com',
        telefono: '70012345',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nombre).toBe('Juan');
    expect(response.body.email).toBe('juan@test.com');
  });

  it('GET /api/clientes lista los clientes', async () => {
    const response = await request(app).get('/api/clientes');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /api/clientes con email duplicado devuelve 400', async () => {
    // Primero creamos un cliente
    await request(app)
      .post('/api/clientes')
      .send({
        nombre: 'Ana',
        apellido: 'García',
        email: 'ana@test.com',
        telefono: '70012345',
      });

    // Intentamos crear otro con el mismo email
    const response = await request(app)
      .post('/api/clientes')
      .send({
        nombre: 'Otra',
        apellido: 'Persona',
        email: 'ana@test.com',
        telefono: '70099999',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('POST /api/citas agenda una cita', async () => {
    const fechaFutura = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

    const response = await request(app)
      .post('/api/citas')
      .send({
        clienteId: 'cli-1',
        empleadoId: 'emp-1',
        servicioId: 'srv-1',
        fechaHora: fechaFutura,
        duracionMinutos: 30,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.estado).toBe('PENDIENTE');
  });

  it('PATCH /api/citas/:id/estado cambia el estado', async () => {
    const fechaFutura = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

    // Crear cita
    const citaResponse = await request(app)
      .post('/api/citas')
      .send({
        clienteId: 'cli-2',
        empleadoId: 'emp-2',
        servicioId: 'srv-1',
        fechaHora: fechaFutura,
        duracionMinutos: 30,
      });

    const citaId = citaResponse.body.id;

    // Confirmar
    const confirmResponse = await request(app)
      .patch(`/api/citas/${citaId}/estado`)
      .send({ accion: 'confirmar' });

    expect(confirmResponse.status).toBe(200);
    expect(confirmResponse.body.estado).toBe('CONFIRMADA');
  });
});