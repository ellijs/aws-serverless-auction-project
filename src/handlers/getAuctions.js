import AWS from 'aws-sdk';
import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors'

// Static!! Perform interactions with DynamoDB Table (Lots of methods, get, patch, put, query and so on)
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuctions(event, context) {
  let auctions;

  try {
      const result = await dynamodb.scan({
          TableName: process.env.AUCTIONS_TABLE_NAME
      }).promise();

      auctions = result.Items
  } catch (error) {
      console.error(error);
      throw new createError.InternalServerError(error)
  }


  return {
    statusCode: 200,
    body: JSON.stringify(auctions),
  };
}

export const handler = middy(getAuctions)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer()) 
  .use(httpErrorHandler())