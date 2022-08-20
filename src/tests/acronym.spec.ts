import { Acronym } from './../models';
import MongooseMock from '../Mocks/MongooseMocks';
import { app } from '../utils';
import '../main';
import request from 'supertest';
import { faker } from '@faker-js/faker';

const token =
  'cnNvcnJtaXJvYXNvZm5pY2FpZm5paWl5b29maWcyb3QkS3BsdXlKaEhIc1FZRjdtTEFHV0RzVWZTT1ViQTNZS2gwakk3NWFiUmowK0E4ejVtSEJ2NVA3MlFwdlJjRTdPbVB4TEVKY1ZTQ05DbGRnMXJDcFZtUTBDQVFmbEVsN0xxeG1Za1hSL3o5VlhMOGJublBib1U1NVU4aEVQaHQwZWxHd1U3b2R5clVZWEMvcWZtYWhuYTRuRXMzTldubmxnQm00RUhYenRtb2d5V0JsWjArc3JjYjI1STN3YzBrWGFOVnF1Ukx2QjJhQmFtTkF2SytVV3NQV3BRcmx0RjhVaWEvUGJTMEpMdmZMUW92K1g1bzRZRVg5UWJIOGJDZDNsblJmVlp2Y2I4WTVHalZKSWJrUW5sQkxaRmJ2SVdSSTlXNmJxcThTZGtyc00vaHFJS28rNTUxc0ZmT0tKejU0TDZZeERsTVRCRzNYVVVTRC9pTDhMN251V29MMlhhOW9QNWRGMDJwaVZhako0L2E4ZTRZa3d5VlFhQ01naUcydVBI';

const data = [
  {
    acronym: faker.random.word(),
    definition: faker.random.words()
  },
  {
    acronym: faker.random.word(),
    definition: faker.random.words()
  },
  {
    acronym: faker.random.word(),
    definition: faker.random.words()
  }
];

const models = {
  acronym: Acronym
};
const methods = [
  'find',
  'findOneAndUpdate',
  'findOneAndDelete',
  'create',
  'countDocuments'
];

beforeAll(() => {
  for (const key in models) {
    for (const method of methods) {
      models[key][method] = MongooseMock(data)[method];
    }
  }
});

describe('Acronym', () => {
  it('Should get acronym by filter', async () => {
    // by default the countDocument function is set to retrun the number 10, based on that we can make tests to ensure the right response
    const emptyQuery = await request(app).get('/acronym');
    expect(emptyQuery.text).toEqual(JSON.stringify(data));
    expect(emptyQuery.status).toEqual(200);
    expect(emptyQuery.headers['more-results']).toEqual('no');

    const queryWithLimit = await request(app).get('/acronym?limit=5');
    expect(queryWithLimit.text).toEqual(JSON.stringify(data));
    expect(queryWithLimit.status).toEqual(200);
    expect(queryWithLimit.headers['more-results']).toEqual('yes');

    const queryWithAllPagination = await request(app).get(
      '/acronym?from=5&limit=5'
    );
    expect(queryWithAllPagination.text).toEqual(JSON.stringify(data));
    expect(queryWithAllPagination.status).toEqual(200);
    expect(queryWithAllPagination.headers['more-results']).toEqual('no');
  });

  it('Should create a new Acronym', async () => {
    const queryWithoutBody = await request(app).post('/acronym').send({});
    expect(queryWithoutBody.status).toEqual(400);
    expect(queryWithoutBody.text).toEqual(
      '{"message":"Missing param acronym"}'
    );

    const queryWithoutAcronym = await request(app)
      .post('/acronym')
      .send({ definition: 'definition' });
    expect(queryWithoutAcronym.status).toEqual(400);
    expect(queryWithoutAcronym.text).toEqual(
      '{"message":"Missing param acronym"}'
    );

    const queryWithoutDefinition = await request(app)
      .post('/acronym')
      .send({ acronym: 'acronym' });
    expect(queryWithoutDefinition.status).toEqual(400);
    expect(queryWithoutDefinition.text).toEqual(
      '{"message":"Missing param definition"}'
    );

    const queryWithRightBody = await request(app)
      .post('/acronym')
      .send({ acronym: 'acronym', definition: 'definition' });
    expect(queryWithRightBody.status).toEqual(200);
    expect(queryWithRightBody.text).toEqual(JSON.stringify(data[0]));
  });

  it('Should update an acronym', async () => {
    const requestWithoutToken = await request(app).put('/acronym');
    expect(requestWithoutToken.status).toEqual(401);
    expect(requestWithoutToken.text).toEqual('{"message":"Invalid session"}');

    const requestWithoutDefinition = await request(app)
      .put('/acronym/acronymunName')
      .set('Authorization', token);
    expect(requestWithoutDefinition.status).toEqual(400);
    expect(requestWithoutDefinition.text).toEqual(
      '{"message":"Missing param definition"}'
    );

    const requestWithRightParams = await request(app)
      .put('/acronym/acronymunName')
      .set('Authorization', token)
      .send({ definition: 'definition' });
    expect(requestWithRightParams.status).toEqual(200);
    expect(requestWithRightParams.text).toEqual(JSON.stringify(data[0]));
  });

  it('Should delete an acronym', async () => {
    const requestWithoutToken = await request(app).delete('/acronym');
    expect(requestWithoutToken.status).toEqual(401);
    expect(requestWithoutToken.text).toEqual('{"message":"Invalid session"}');

    const requestWithRightParams = await request(app)
      .delete('/acronym/acronymunName')
      .set('Authorization', token);
    expect(requestWithRightParams.status).toEqual(200);
    expect(requestWithRightParams.text).toEqual(JSON.stringify(data[0]));
  });
});
