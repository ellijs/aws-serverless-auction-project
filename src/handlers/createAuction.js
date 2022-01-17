async function createAuction(event, context) {
  // we need 2 args when lambda is executed 'evevt', 'context'
  // 'event' => Obj include all the info about body, headers, metadata, etc
  // 'context' => custome data with middleware, ex) auth, id of user

  const { title } = JSON.parse(event.body);
  const now = new Date();

  const auction = {
    title,
    status: 'OPEN',
    createAt: now.toISOString(),
  };

  return {
    statusCode: 201, // resource created code
    body: JSON.stringify(auction),
    // Response of the body has to be 'STRINGYFY' !!
  };
}

export const handler = createAuction;


// wen need 'handler' when export !! you can check in yml file that's connected to src/handlers/createAuction/handler

// Lambda only work in 15 mins, we can store static data in here, but we CANNOT store dynamic data in this function.