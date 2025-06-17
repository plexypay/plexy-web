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

export interface FastCheckoutProfile {
    profile: any;
    deliveryAddress: any;
    billingAddress: any;
}

// interface FastCheckoutAuthenticationSucceeded {
//     authenticationState: 'succeeded';
//     profileData: FastCheckoutProfile;
// }
//
// interface FastCheckoutAuthenticationFailed {
//     authenticationState: 'failed' | 'canceled' | 'not_found';
//     profileData?: undefined;
//     error?: unknown;
// }

// export type FastCheckoutAuthenticationResult = FastCheckoutAuthenticationFailed | FastCheckoutAuthenticationSucceeded;
