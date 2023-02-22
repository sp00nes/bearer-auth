'use strict';

const { server } = require('../../../../src/server');
const { db, userModel } = require('../../../../src/auth/models');
const supertest =  require('supertest');
const request = supertest(server);

let testWriter;

beforeAll( async () => {
  db.sync();
  testWriter = await userModel.create({
    username: 'writer',
    password: 'pass123',
    role: 'writer',
  });
});

afterAll( async () => {
  db.drop();
});

describe('ACL Intermigration', () => {
  it('allows read access', async () => {
    let response = await request.get('/read').set('Authorization', `Bearer ${testWriter.token}`);

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('You have read permission');
  });
  it('allows create access', async () => {
    let response = await request.post('/create').set('Authorization', `Bearer ${testWriter.token}`);

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('You have create permission');
  });
  it('does not allows a writer update access', async () => {
    let response = await request.put('/update').set('Authorization', `Bearer ${testWriter.token}`);
    expect(response.status).toEqual(500);
    expect(response.text).toEqual('{"error":"Access Denied"}');
  });
  it('does not allows a writer delete access', async () => {
    let response = await request.delete('/delete').set('Authorization', `Bearer ${testWriter.token}`);

    expect(response.status).toEqual(500);
    expect(response.text).toEqual('{"error":"Access Denied"}');
  });
});
