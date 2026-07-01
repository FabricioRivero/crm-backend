import request from 'supertest';
import { crearApp } from '../../src/app';

describe('E2E: /api/citas', () => {
  const app = crearApp();
  const fechaFutura = () => new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  it('POST /api/citas agenda una cita y devuelve 201', async () => {
    const res = await request(app).post('/api/citas').send({
      clienteId: 'cli-1',
      empleadoId: 'emp-1',
      servicioId: 'srv-1',
      fechaHora: fechaFutura(),
      duracionMinutos: 30,
    });

    expect(res.status).toBe(201);
    expect(res.body.estado).toBe('PENDIENTE');
  });

  it('PATCH /api/citas/:id/estado confirma una cita agendada', async () => {
    const hora = fechaFutura();
    const creada = await request(app).post('/api/citas').send({
      clienteId: 'cli-2',
      empleadoId: 'emp-2',
      servicioId: 'srv-1',
      fechaHora: hora,
      duracionMinutos: 30,
    });

    const res = await request(app)
      .patch(`/api/citas/${creada.body.id}/estado`)
      .send({ accion: 'confirmar' });

    expect(res.status).toBe(200);
    expect(res.body.estado).toBe('CONFIRMADA');
  });

  it('POST /api/citas con horario solapado devuelve 400', async () => {
    const hora = fechaFutura();
    await request(app).post('/api/citas').send({
      clienteId: 'cli-3',
      empleadoId: 'emp-solapado',
      servicioId: 'srv-1',
      fechaHora: hora,
      duracionMinutos: 30,
    });

    const res = await request(app).post('/api/citas').send({
      clienteId: 'cli-4',
      empleadoId: 'emp-solapado',
      servicioId: 'srv-1',
      fechaHora: hora,
      duracionMinutos: 30,
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('ya tiene una cita');
  });
});
