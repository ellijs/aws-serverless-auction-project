import AWS from "aws-sdk";
import commonMiddleware from '../lib/commonMiddleware';
import createError from "http-errors";

// Static!! Perform interactions with DynamoDB Table (Lots of methods, get, patch, put, query and so on)
const dynamodb = new AWS.DynamoDB.DocumentClient();


export async function getAuctionById(id) {
    let auction;

    try {
        const result = await dynamodb
          .get({
            TableName: process.env.AUCTIONS_TABLE_NAME,
            Key: { id } 
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

    return auction
}


async function getAuction(event, context) {
  const { id } = event.pathParameters;
  const auction = await getAuctionById(id) // put this 'getAuctionById' separately so we can use that function to another handler

  return {
    statusCode: 200,
    body: JSON.stringify(auction),
  };
}

export const handler = commonMiddleware(getAuction)
