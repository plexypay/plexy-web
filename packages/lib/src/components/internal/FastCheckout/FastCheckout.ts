import CheckoutSession from '../../../core/CheckoutSession';
import AdyenCheckoutError from '../../../core/Errors/AdyenCheckoutError';
import { resolveEnvironments } from '../../../core/Environment';
import { AbstractFastCheckoutProvider } from './services/AbstractFastCheckoutProvider';
import { Bolt } from './services/Bolt';
import { Skipify } from './services/Skipify';
import { FastCheckoutAuthResult } from './models/FastCheckoutAuthResult';

import type { CoreConfiguration } from '../../../core/types';
import { BoltConfiguration, FastCheckoutConfiguration, ProviderConfiguration, SkipifyConfiguration } from './types';

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

    public async authenticate(email: string): Promise<FastCheckoutAuthResult> {
        if (!email) {
            throw new AdyenCheckoutError('IMPLEMENTATION_ERROR', 'You must pass a valid email');
        }

        try {
            const { providers } = await this.session.requestShopperProvider(email);
            console.log('Providers Response', providers);

            const selectedProvider = this.selectMyTestingProvider(providers);

            if (!selectedProvider) {
                return new FastCheckoutAuthResult('not_found');
            }

            const provider = await this.initializeProviderIfNeeded(selectedProvider);
            const authCredential = this.getAuthenticationCredentials(selectedProvider, email);

            return await provider.authenticate(authCredential);
        } catch (error: unknown) {
            console.log(error);
            return new FastCheckoutAuthResult('failed', null, error);
        }
    }

    /**
     * TODO: For testing purposes. Should be removed
     * Set the provider that you want to use on 'providerBeingTested' string.
     *
     * Use-case: useful when you want to test Skipify but Bolt is returned first or vice-versa
     *
     * @deprecated
     * @param providers
     * @private
     */
    private selectMyTestingProvider(providers: Array<BoltConfiguration | SkipifyConfiguration>) {
        if (providers.length === 0) {
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const providerFromUrl = urlParams.get('provider');

        const selectedProvider = providerFromUrl && providers.find(p => p.type === providerFromUrl);

        return selectedProvider || providers[0];
    }

    /**
     * For Bolt, we use the shopper email provided by the frontend
     * For Skipify, we use the lookupResult returned by the providers endpoint
     *
     * @param provider
     * @param email
     * @private
     */
    private getAuthenticationCredentials(provider: ProviderConfiguration, email: string): string {
        if (provider.type === 'bolt') return email;
        if (provider.type === 'skipify') return provider.configuration.skipifyJson;
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
                return new Bolt(this.environment, configuration.publishableKey, this.session);
            case 'skipify':
                return new Skipify(this.environment, configuration?.merchantId || '27c11f77-37ec-4e34-b066-4e645681859b');
            default:
                throw new AdyenCheckoutError('IMPLEMENTATION_ERROR', 'The provider is not supported');
        }
    }
}

export default FastCheckout;
