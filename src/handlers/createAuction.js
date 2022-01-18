import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
// import middy from '@middy/core'
// import httpJsonBodyParser from '@middy/http-json-body-parser';
// import httpEventNormalizer from '@middy/http-event-normalizer';
// import httpErrorHandler from '@middy/http-error-handler';
import commonMiddleware from '../lib/commonMiddleware';
import createError from 'http-errors'

// Static!! Perform interactions with DynamoDB Table (Lots of methods, get, patch, put, query and so on)
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  // we need 2 args when lambda is executed 'evevt', 'context'
  // 'event' => Obj include all the info about body, headers, metadata, etc
  // 'context' => custome data with middleware, ex) auth, id of user

  const { title } = event.body;
  // const { title } = event.body;
  
  const now = new Date();
  const endDate = new Date();
  endDate.setHours(now.getHours() + 1);
  // endDate.setDays(now.getDays() + 1);

  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    createAt: now.toISOString(),
    endingAt: endDate.toISOString(),
    highestBid: {
      amount: 0,
    }
  };
  
  // Use Promise, and await this put method executed and return ID and continue with the result
  // Has to be Capitalized !!
 try {
  await dynamodb.put({
    TableName: process.env.AUCTIONS_TABLE_NAME, //'AuctionsTable',
    Item: auction, 
  }).promise(); 
 } catch(error) {
   console.error(error)
   throw new createError.InternalServerError(error);

  //  throw new createError.NotFound(error);
  //  throw new createError.Unauthorized(error);
 }

  return {
    statusCode: 201, // resource created code
    body: JSON.stringify(auction),
    // Response of the body has to be 'STRINGYFY' !!
  };
}

export const handler = commonMiddleware(createAuction);
  // .use(httpJsonBodyParser())
  // .use(httpEventNormalizer()) 
  // .use(httpErrorHandler())

// wen need 'handler' when export !! you can check in yml file that's connected to src/handlers/createAuction/handler

// Lambda only work in 15 mins, we can store static data in here, but we CANNOT store dynamic data in this function.

// middleware : before or after of lambda handler, auth, or validating user token.  => middy 