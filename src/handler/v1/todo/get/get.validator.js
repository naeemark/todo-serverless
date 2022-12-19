const Joi = require('@hapi/joi');

module.exports = {
  name: 'get',
  path: '/v1/todo{id}',
  type: 'get',
  joiSchema: {
    params: Joi.object().keys({ id: Joi.string().guid().required() }).options({ stripUnknown: true }),
    response: {
      200: {
        description: Joi.string(),
        body: {
          responseCode: 200,
          responseMessage: Joi.string().required()
        }
      },
      400: {
        description: 'Error Response',
        body: {
          responseCode: 400,
          responseMessage: Joi.string().required(),
          response: {
            errors: Joi.array().items(Joi.object().keys({
              errorCode: Joi.string().required(),
              errorTitle: Joi.string().required(),
              errorDescription: Joi.string().required(),
              errorDebugDescription: Joi.string()
            }))
          }
        }
      }
    }
  }
};
