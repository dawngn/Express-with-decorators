import request from 'supertest';
import { app, Shutdown } from '../../src/server';

describe('Server', () => {
  afterAll((done) => {
     Shutdown(done);
  })

  it('Start and has proper test env', async () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(app).toBeDefined();
  }, 10000)

  it('Return all options allowed', async () => {
    const response = await request(app).options('/');
    expect(response.status).toBe(200);
    expect(response.headers['access-control-allow-methods']).toBe('GET, POST, PUT, PATCH, DELETE');
  })
})