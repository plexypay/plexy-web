import { httpPost } from '../http';
import CheckoutSession from '../../CheckoutSession';
import { API_VERSION } from './constants';

import type { CheckoutSessionProvidersResponse } from '../../CheckoutSession/types';

/**
 * Request a valid FastCheckout provider based on the shopper email
 *
 * @param session
 * @param shopperEmail
 */
function requestShopperProvider(session: CheckoutSession, shopperEmail: string): Promise<CheckoutSessionProvidersResponse> {
    const path = `${API_VERSION}/sessions/${session.id}/providers?clientKey=${session.clientKey}`;

    const data = {
        sessionData: session.data,
        shopperEmail
    };

    return httpPost<CheckoutSessionProvidersResponse>(
        {
            loadingContext: session.loadingContext,
            path,
            errorLevel: 'fatal'
        },
        data
    );
}

export default requestShopperProvider;
