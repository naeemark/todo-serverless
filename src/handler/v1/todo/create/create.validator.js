const Joi = require('@hapi/joi');

module.exports = {
  name: 'create',
  path: '/v1/todo',
  type: 'post',
  joiSchema: {
    body: Joi.object({
      title: Joi.string().required().strict(),
      description: Joi.string().required().strict()
    }).options({ stripUnknown: true }),
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
