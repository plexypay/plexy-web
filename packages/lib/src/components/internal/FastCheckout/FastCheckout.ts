import CheckoutSession from '../../../core/CheckoutSession';
import { resolveEnvironments } from '../../../core/Environment';
import AdyenCheckoutError from '../../../core/Errors/AdyenCheckoutError';

import type { CoreConfiguration } from '../../../core/types';
import type { CheckoutSessionProvidersResponse } from '../../../core/CheckoutSession/types';

interface FastCheckoutProps {
    session: {
        id: string;
        sessionData?: string;
    };
    environment: CoreConfiguration['environment'];
    clientKey: string;
}

class FastCheckout {
    private readonly session: CheckoutSession;

    constructor({ session, environment, clientKey }: FastCheckoutProps) {
        const { apiUrl } = resolveEnvironments(environment);

        this.session = new CheckoutSession({ id: session.id, sessionData: session.sessionData }, clientKey, apiUrl);
    }

    public async lookupShopper(email: string): Promise<CheckoutSessionProvidersResponse> {
        if (!email) {
            throw new AdyenCheckoutError('IMPLEMENTATION_ERROR', 'You must pass a valid email');
        }

        try {
            return await this.session.requestShopperProvider(email);
        } catch (error) {
            console.error('lookupShopper:', error);
        }
    }
}

export { FastCheckout };
