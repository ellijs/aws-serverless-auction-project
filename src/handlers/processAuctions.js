import { getEndedAuctions } from '../lib/getEndedAuctions'
import { closeAuction } from '../lib/closeAuction'
import createError from 'http-errors';

async function processAuctions(event, context) {

    try {
        const auctionsToClose = await getEndedAuctions()
        const closePromises = auctionsToClose.map(auction => closeAuction(auction))
        await Promise.all(closePromises);

        return { closed: closePromises.length };
        // this function is not triggered by API gateway, so, we can return whatever we want
    } catch ( error ) {
        console.error(error);
        throw new createError.InternalServerError(error)
    }
   
}

export const handler = processAuctions;

// we don't use middy here bc we don't use gateway here