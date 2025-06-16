import CheckoutSession from '../../../core/CheckoutSession';
import AdyenCheckoutError from '../../../core/Errors/AdyenCheckoutError';
import { resolveEnvironments } from '../../../core/Environment';
import { AbstractFastCheckoutProvider } from './services/AbstractFastCheckoutProvider';
import { Bolt } from './services/Bolt';
import { Skipify } from './services/Skipify';

import type { CoreConfiguration } from '../../../core/types';
import type { FastCheckoutAuthenticationResult, FastCheckoutConfiguration, ProviderConfiguration } from './types';

class FastCheckout {
    private readonly session: CheckoutSession;
    private readonly environment: CoreConfiguration['environment'];

    private providers: Map<string, AbstractFastCheckoutProvider>;

    constructor({ session, environment, clientKey }: FastCheckoutConfiguration) {
        const { apiUrl } = resolveEnvironments(environment);

        this.providers = new Map();
        this.environment = environment;
        this.session = new CheckoutSession({ id: session.id, sessionData: session.sessionData }, clientKey, apiUrl);
    }

    public async authenticate(email: string): Promise<FastCheckoutAuthenticationResult> {
        if (!email) {
            throw new AdyenCheckoutError('IMPLEMENTATION_ERROR', 'You must pass a valid email');
        }

        try {
            const { providers } = await this.session.requestShopperProvider(email);

            if (providers?.length === 0) {
                return { authenticationState: 'not_found' };
            }

            const provider = await this.initializeProviderIfNeeded(providers[0]);
            const authResult = await provider.authenticate(email);

            console.log('FastCheckout :: authenticate result -> ', authResult);
        } catch (error) {
            console.error('authenticate:', error);
            return { authenticationState: 'failed', error };
        }
    }

    private async initializeProviderIfNeeded(providerConfiguration: ProviderConfiguration): Promise<AbstractFastCheckoutProvider> {
        if (this.providers.has(providerConfiguration.type)) {
            return this.providers.get(providerConfiguration.type);
        }

        try {
            const { type } = providerConfiguration;
            const provider = this.createProvider(providerConfiguration);
            await provider.initialize();
            this.providers.set(type, provider);
            return provider;
        } catch (error) {
            throw new AdyenCheckoutError('SDK_ERROR', 'Something went wrong when initializing the provider SDK', { cause: error });
        }
    }

    private createProvider(providerConfiguration: ProviderConfiguration): AbstractFastCheckoutProvider {
        const { type, configuration } = providerConfiguration;

        switch (type) {
            case 'bolt':
                return new Bolt(this.environment, configuration.publishableKey);
            case 'skipify':
                return new Skipify(configuration.merchantId);
            default:
                throw new AdyenCheckoutError('IMPLEMENTATION_ERROR', 'The provider is not supported');
        }
    }
}

export { FastCheckout };
