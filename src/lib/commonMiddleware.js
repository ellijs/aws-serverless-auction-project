import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import cors from '@middy/http-cors';

// Two below are for detailed error messages for 400 (Bad Request) responses
// can be replace @middy/http-error-handler
import JSONErrorHandlerMiddleware from 'middy-middleware-json-error-handler';
import createHttpError from 'http-errors'


export default handler => middy(handler)
    .use([
        httpJsonBodyParser(),
        httpEventNormalizer(),
        httpErrorHandler(),
        JSONErrorHandlerMiddleware(),
        cors(),
    ])