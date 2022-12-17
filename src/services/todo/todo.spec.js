/* eslint-disable arrow-body-style */
const { APIError } = require('@utils/APIError');
const todoRepository = require('../../repositories/todo');

const service = require('./todo.service');

jest.mock('../../repositories/todo');

describe('Service - todo', () => {
  const id = 123;
  beforeEach(() => { jest.useFakeTimers(); });

  afterEach(() => { jest.resetAllMocks(); });

  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 10000)); // avoid jest open handle error
  });

  it('test create with empty request', () => {
    todoRepository.create.mockImplementation(() => Promise.reject(APIError.withCode('DATASTORE_FAILURE')));
    return service.create({}).catch((error) => {
      expect(error).not.toBe(null);
      expect(error).toBeInstanceOf(APIError);
    });
  });

  it('should do unit test for create', () => {
    todoRepository.create.mockImplementation(() => Promise.resolve({ id }));
    return service.create({}).then((response) => {
      expect(response).not.toBe(null);
      expect(response).toBeObject();
      expect(response).toHaveProperty('id');
      expect(response.id).toEqual(id);
    });
  });
});
