async function processAuctions(event, context) {
    console.log('processing auctions!')
}

export const handler = processAuctions;

// we don't use middy here bc we don't use gateway here