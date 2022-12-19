const Joi = require('@hapi/joi');

module.exports = {
  name: 'createByPut',
  path: '/v1/todo',
  type: 'put',
  joiSchema: {
    body: Joi.object({
      id: Joi.string().guid().required().strict(),
      title: Joi.string().required().strict(),
      description: Joi.string().required().strict()
    }).options({ stripUnknown: false }),
    response: {
      200: {
        description: 'OK',
        body: {
          responseCode: 200,
          responseMessage: Joi.string().required(),
          response: {}
        }
      },
      400: {
        description: 'Error Response',
        body: {
          responseCode: 400,
          responseMessage: Joi.string().required(),
          response: {
            errors: Joi.array().items(
              Joi.object().keys({
                errorCode: Joi.string().required(),
                errorTitle: Joi.string().required(),
                errorDescription: Joi.string().required(),
                errorDebugDescription: Joi.string()
              })
            )
          }
        }
      }
    }
  }
};
