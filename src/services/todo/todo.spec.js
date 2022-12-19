/* eslint-disable arrow-body-style */
const { APIError } = require('@utils/APIError');
const todoRepository = require('../../repositories/todo');

const service = require('./todo.service');

jest.mock('../../repositories/todo');

describe('Service - todo', () => {
  const todo = {
    id: 'bb73670b-d5e6-42af-9e5a-ce4797841d3d',
    title: 'API',
    description: 'Create an API that meets the requirements'
  };
  beforeEach(() => { jest.useFakeTimers(); });

  afterEach(() => { jest.resetAllMocks(); });

  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 10000)); // avoid jest open handle error
  });

  it('test create with empty request', () => {
    todoRepository.createItem.mockImplementation(() => Promise.reject(APIError.withCode('DATASTORE_FAILURE')));
    return service.create({}).catch((error) => {
      expect(error).not.toBe(null);
      expect(error).toBeInstanceOf(APIError);
    });
  });

  it('should do unit test for create', () => {
    todoRepository.createItem.mockImplementation(() => Promise.resolve(todo));
    return service.create({}).then((response) => {
      expect(response).not.toBe(null);
      expect(response).toBeObject();
      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('title');
      expect(response).toHaveProperty('description');
      expect(response.id).toEqual(todo.id);
    });
  });

  it('should do unit test for retrieve - failure', () => {
    todoRepository.getItem.mockImplementation(() => Promise.reject(APIError.withCode('DATASTORE_FAILURE')));
    return service.get(todo.id).catch((error) => {
      expect(error).not.toBe(null);
      expect(error).toBeInstanceOf(APIError);
    });
  });

  it('should do unit test for get - failure', () => {
    todoRepository.getItem.mockImplementation(() => Promise.resolve(null));
    return service.get(todo.id).catch((error) => {
      expect(error).not.toBe(null);
      console.log(error);
    });
  });

  it('should do unit test for retrieve - success', () => {
    todoRepository.getItem.mockImplementation(() => Promise.resolve(todo));
    return service.get(todo.id).then((response) => {
      expect(response).not.toBe(null);
      expect(response).toBeObject();
      expect(response).toHaveProperty('id');
      expect(response.id).toEqual(todo.id);
      expect(response).toEqual(todo);
    });
  });
});
