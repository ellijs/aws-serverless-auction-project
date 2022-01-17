import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';

// Static!! Perform interactions with DynamoDB Table (Lots of methods, get, patch, put, query and so on)
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  // we need 2 args when lambda is executed 'evevt', 'context'
  // 'event' => Obj include all the info about body, headers, metadata, etc
  // 'context' => custome data with middleware, ex) auth, id of user

  const { title } = JSON.parse(event.body);
  const now = new Date();

  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    createAt: now.toISOString(),
  };
  
  // Use Promise, and await this put method executed and return ID and continue with the result
  // Has to be Capitalized !!
  await dynamodb.put({
    TableName: process.env.AUCTIONS_TABLE_NAME, //'AuctionsTable',
    Item: auction, 
  }).promise(); 

  return {
    statusCode: 201, // resource created code
    body: JSON.stringify(auction),
    // Response of the body has to be 'STRINGYFY' !!
  };
}

export const handler = createAuction;


// wen need 'handler' when export !! you can check in yml file that's connected to src/handlers/createAuction/handler

// Lambda only work in 15 mins, we can store static data in here, but we CANNOT store dynamic data in this function.