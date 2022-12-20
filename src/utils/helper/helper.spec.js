/* eslint-disable arrow-body-style */
const httpStatus = require('http-status');
const MockRes = require('mock-express-response');
const util = require('./helper.util');

describe('Utility - helper', () => {
  beforeEach(() => { jest.useFakeTimers(); });

  afterEach(() => { });

  it('should return no response', () => {
    const result = util.OK();
    expect(result).toHaveProperty('statusCode');
    expect(result.statusCode).toBe(httpStatus.OK);
    const data = JSON.parse(result.body);
    expect(data.responseMessage).toBe('OK');
  });

  it('should return OK response', () => {
    const res = new MockRes();
    const result = util.OK(res);
    expect(result).toHaveProperty('statusCode');
    expect(result.statusCode).toBe(httpStatus.OK);
  });

  it('should return OK response message', () => {
    const message = 'Success';
    const res = new MockRes();
    const result = util.OK(message, res);
    expect(result).toHaveProperty('statusCode');
    expect(result.statusCode).toBe(httpStatus.OK);

    const data = JSON.parse(result.body);
    expect(data.responseMessage).toBe(message);
  });
});
