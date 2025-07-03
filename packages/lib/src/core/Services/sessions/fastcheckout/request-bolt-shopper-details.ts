import { httpPost } from '../../http';
import CheckoutSession from '../../../CheckoutSession';
import { API_VERSION } from '../constants';

import type { CheckoutSessionShopperDetailsResponse } from '../../../CheckoutSession/types';

/**
 * Request the shopper details
 *
 * @param session - Checkout session
 * @param authorizationCode - Code returned by Bolt after the OTP recognition
 */
function requestBoltShopperDetails(session: CheckoutSession, authorizationCode: string): Promise<CheckoutSessionShopperDetailsResponse> {
    const path = `${API_VERSION}/sessions/${session.id}/providers/submit?clientKey=${session.clientKey}`;

    const data = {
        sessionData: session.data,
        authToken: authorizationCode
    };

    return httpPost<CheckoutSessionShopperDetailsResponse>(
        {
            loadingContext: session.loadingContext,
            path,
            errorLevel: 'fatal'
        },
        data
    );
}

export default requestBoltShopperDetails;
