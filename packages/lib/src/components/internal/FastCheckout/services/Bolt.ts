import { BoltSDKLoader } from './BoltSDKLoader';
import type { IBoltSDK } from './types';
import { AbstractFastCheckoutProvider } from './AbstractFastCheckoutProvider';

class Bolt implements AbstractFastCheckoutProvider {
    private readonly sdkLoader: BoltSDKLoader;
    private readonly publishableKey: string;
    private boltSdk: IBoltSDK;

    constructor(environment: string, publishableKey: string) {
        this.publishableKey = publishableKey;
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
    public async authenticate(email: string): Promise<any> {
        const loginModal = this.boltSdk.create('login_modal', { autoDetectEmail: false });
        const result = await loginModal.attemptLogin({ email });
        console.log('Bolt :: authenticate result ->', result);

        return result;
    }
}

export { Bolt };
