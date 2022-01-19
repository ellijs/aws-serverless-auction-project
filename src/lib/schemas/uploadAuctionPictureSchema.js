const schema = {
    // type: 'object',
    properties: {
      body: {
        type: 'string',
        minLength: 1,
        pattern: '\=$'  // string ends with an equal sign
      },
    },
    required: ['body'],
  };
  
  export default schema;