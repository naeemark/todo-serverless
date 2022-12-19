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

  it('should do unit test for list - failure', () => {
    todoRepository.list.mockImplementation(() => Promise.reject(APIError.withCode('DATASTORE_FAILURE')));
    return service.list().catch((error) => {
      expect(error).not.toBe(null);
      expect(error).toBeInstanceOf(APIError);
    });
  });

  it('should do unit test for list - success - empty', () => {
    todoRepository.list.mockImplementation(() => Promise.resolve([]));
    return service.list().then((response) => {
      expect(response).not.toBe(null);
      expect(response).toBeArray();
      expect(response).toBeArray();
      expect(response.length).toEqual(0);
    });
  });

  it('should do unit test for list - success - withData', () => {
    todoRepository.list.mockImplementation(() => Promise.resolve([todo]));
    return service.list().then((response) => {
      expect(response).not.toBe(null);
      expect(response).toBeArray();
      expect(response).toBeArray();
      expect(response.length).toEqual(1);
      expect(response[0]).toHaveProperty('id');
      expect(response[0].id).toEqual(todo.id);
      expect(response[0]).toEqual(todo);
    });
  });

  // it('should do unit test for retrieveProperty - failure', () => {
  //   todoRepository.retrieve.mockImplementation(() => Promise.reject(APIError.withCode('DATASTORE_FAILURE')));
  //   return service.retrieveProperty(id, 'id').catch((error) => {
  //     expect(error).not.toBe(null);
  //     expect(error).toBeInstanceOf(APIError);
  //   });
  // });

  // it('should do unit test for retrieveProperty - success', () => {
  //   todoRepository.retrieve.mockImplementation(() => Promise.resolve({ id }));
  //   return service.retrieveProperty(id, 'id').then((response) => {
  //     expect(response).not.toBe(null);
  //     expect(response).toEqual(id);
  //   });
  // });

  // it('should do unit test for update - failure ', () => {
  //   todoRepository.update.mockImplementation(() => Promise.reject(APIError.withCode('DATASTORE_FAILURE')));
  //   return service.update(id).catch((error) => {
  //     expect(error).not.toBe(null);
  //     expect(error).toBeInstanceOf(APIError);
  //   });
  // });

  // it('should do unit test for update - success ', () => {
  //   todoRepository.update.mockImplementation(() => Promise.resolve({ id }));
  //   return service.update(id, body).then((response) => {
  //     expect(response).not.toBe(null);
  //     expect(response).toBeObject();
  //     expect(response).toHaveProperty('id');
  //     expect(response.id).toEqual(id);
  //   });
  // });

  // it('should do unit test for deleteEntity - failure', () => {
  //   todoRepository.deleteEntity.mockImplementation(() => Promise.reject(APIError.withCode('DATASTORE_FAILURE')));
  //   return service.deleteEntity(id).catch((error) => {
  //     expect(error).not.toBe(null);
  //     expect(error).toBeInstanceOf(APIError);
  //   });
  // });

  // it('should do unit test for deleteEntity - success: true', () => {
  //   todoRepository.deleteEntity.mockImplementation(() => Promise.resolve({ success: true }));
  //   return service.deleteEntity(id).then((response) => {
  //     expect(response).not.toBe(null);
  //     expect(response).toBeObject();
  //     expect(response).toHaveProperty('success');
  //     expect(response.success).toEqual(true);
  //   });
  // });

  // it('should do unit test for deleteEntity - success: false', () => {
  //   todoRepository.deleteEntity.mockImplementation(() => Promise.resolve({ success: false }));
  //   return service.deleteEntity(id).then((response) => {
  //     expect(response).not.toBe(null);
  //     expect(response).toBeObject();
  //     expect(response).toHaveProperty('success');
  //     expect(response.success).toEqual(false);
  //   });
  // });
});
