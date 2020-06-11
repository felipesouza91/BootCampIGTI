export const swaggerDocument = {
  swagger: '2.0',
  info: {
    description: 'This is a API for a bank transactional',
    version: '1.0.0',
    title: 'My Bank API',
    termsOfService: 'http://swagger.io/terms/',
    contact: {
      email: 'email@email.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  host: 'localhost:3333',
  basePath: '/',
  tags: [
    {
      name: 'Accounts',
      description: 'Acess accouunts',
      externalDocs: {
        description: 'Find out more',
        url: 'http://swagger.io',
      },
    },
  ],
  schemes: ['http'],
  paths: {
    '/account': {
      post: {
        tags: ['Accounts'],
        summary: 'Add a new pet to the store',
        description: '',
        operationId: 'addPet',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Pet object that needs to be added to the store',
            required: true,
            schema: {
              $ref: '#/definitions/Account',
            },
          },
        ],
        responses: {
          '201': {
            description: 'Create account',
          },
          '400': {
            description: 'Invalid input body',
          },
        },
      },
    },
  },
  definitions: {
    Account: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
        },
        balance: {
          type: 'integer',
          format: 'int32',
        },
        name: {
          type: 'string',
          format: 'string',
        },
      },
      xml: {
        name: 'Order',
      },
    },
  },
  externalDocs: {
    description: 'Find out more about Swagger',
    url: 'http://swagger.io',
  },
};
