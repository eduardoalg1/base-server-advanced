import { Example } from './../models';
import MongooseMock from '../Mocks/MongooseMocks';
import { app } from '../utils';
import '../main';
import request from 'supertest';
import { faker } from '@faker-js/faker';

const data = [
  {
    definition: faker.random.words()
  }
];

const models = {
  example: Example
};
const methods = ['find'];

beforeAll(() => {
  for (const key in models) {
    for (const method of methods) {
      models[key][method] = MongooseMock(data)[method];
    }
  }
});

describe('Acronym', () => {
  it('Should get acronym by filter', async () => {
    const emptyQuery = await request(app).get('/acronym');
    expect(emptyQuery.text).toEqual(JSON.stringify(data));
    expect(emptyQuery.status).toEqual(200);
  });
});
