import type { CoreConfiguration } from '../../../core/types';

export interface FastCheckoutConfiguration {
    session: {
        id: string;
        sessionData?: string;
    };
    environment: CoreConfiguration['environment'];
    clientKey: string;
}

export type SkipifyConfiguration = {
    type: 'skipify';
    name: string;
    configuration: {
        merchantId: string;
        skipifyJson: string;
    };
};
export type BoltConfiguration = {
    type: 'bolt';
    name: string;
    configuration: {
        publishableKey: string;
    };
};
export type ProviderConfiguration = BoltConfiguration | SkipifyConfiguration;

/**
 * Shopper profile returned by the Adyen Backend
 */
export interface FastCheckoutProfile {
    profile: any;
    deliveryAddress: any;
    billingAddress: any;
}
