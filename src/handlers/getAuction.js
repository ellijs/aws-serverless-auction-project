import AWS from "aws-sdk";
import commonMiddleware from '../lib/commonMiddleware';
import createError from "http-errors";

// Static!! Perform interactions with DynamoDB Table (Lots of methods, get, patch, put, query and so on)
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuction(event, context) {
  let auction;
  const { id } = event.pathParameters;

  try {
    const result = await dynamodb
      .get({
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Key: { id } // Has to be CAPITALIZED!!!!
      })
      .promise();

    auction = result.Item;

  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  if (!auction) {
      throw new createError.NotFound(`Auctions with ID "${id} is not found.`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(auction),
  };
}

export const handler = commonMiddleware(getAuction)
