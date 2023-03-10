const Joi = require('@hapi/joi');

module.exports = {
  name: 'update',
  path: '/v1/todo/{id}',
  type: 'put',
  joiSchema: {
    params: Joi.object().keys({ id: Joi.string().guid().required() }).options({ stripUnknown: true }),
    body: Joi.object({
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
