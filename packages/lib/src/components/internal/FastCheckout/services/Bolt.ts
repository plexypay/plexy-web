import { BoltSDKLoader } from './BoltSDKLoader';
import { AbstractFastCheckoutProvider } from './AbstractFastCheckoutProvider';
import AdyenCheckoutError from '../../../../core/Errors/AdyenCheckoutError';
import CheckoutSession from '../../../../core/CheckoutSession';
import { FastCheckoutAuthResult } from '../models/FastCheckoutAuthResult';

import type { IBoltSDK } from './types';
import type { FastCheckoutProfile } from '../types';

class Bolt implements AbstractFastCheckoutProvider {
    private readonly sdkLoader: BoltSDKLoader;
    private readonly publishableKey: string;
    private readonly session: CheckoutSession;
    private boltSdk: IBoltSDK;

    constructor(environment: string, publishableKey: string, session: CheckoutSession) {
        this.publishableKey = publishableKey;
        this.session = session;
        this.sdkLoader = new BoltSDKLoader(environment, publishableKey);
    }

    public async initialize(): Promise<void> {
        this.boltSdk = await this.sdkLoader.load();
        this.boltSdk.initialize(this.publishableKey);
    }

    /**
     * We do not want this flow, but let's try it out anyway
     * https://help.bolt.com/products/ignite/api-implementation/components/login-modal/#step-1-create-the-login-modal-on-sign-in-registration-and-checkout
     * @deprecated
     */
    public createLoginModalUsingExistingEmailInput(containerId: string): void {
        const loginModal = this.boltSdk.create('login_modal');
        loginModal.attach(containerId, { context: 'checkout' });

        // Error means the user either dismissed the modal, or there was an error
        this.boltSdk.on('login_failed', loginFailedResponse => {
            console.log('login_failed', loginFailedResponse);
        });

        // use the `result` to get shopper details as described in the previous step
        // The response with authorization code should only be used once
        this.boltSdk.once('login_succeeded', loginSuccessResponse => {
            console.log('login_succeeded', loginSuccessResponse);
        });
    }

    /**
     * https://help.bolt.com/products/ignite/api-implementation/components/login-modal/#manual-handling-alternative
     * @param email
     */
    public async authenticate(email: string): Promise<FastCheckoutAuthResult> {
        const loginModal = this.boltSdk.create('login_modal', { autoDetectEmail: false });

        try {
            const result = await loginModal.attemptLogin({ email });

            if (result instanceof Error) {
                return new FastCheckoutAuthResult('canceled');
            }

            const profileData = await this.requestShopperDetails(result.authorizationCode);
            return new FastCheckoutAuthResult('succeeded', profileData);
        } catch (error: unknown) {
            throw new AdyenCheckoutError('SDK_ERROR', 'Something went wrong when authentication the shopper with Bolt', { cause: error });
        }
    }

    private async requestShopperDetails(authorizationCode: string): Promise<FastCheckoutProfile> {
        if (!authorizationCode) {
            throw new AdyenCheckoutError('IMPLEMENTATION_ERROR', 'There is no "authorizationCode" value to request shopper details');
        }

        try {
            const { sessionData, ...profile } = await this.session.requestBoltShopperDetails(authorizationCode);
            return profile;
        } catch (error) {
            throw new AdyenCheckoutError('SDK_ERROR', 'Something went wrong when requesting shopper details', { cause: error });
        }
    }
}

export { Bolt };
