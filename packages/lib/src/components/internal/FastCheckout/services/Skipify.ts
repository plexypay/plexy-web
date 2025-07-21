import { AbstractFastCheckoutProvider } from './AbstractFastCheckoutProvider';
// import { FastCheckoutAuthResult } from '../models/FastCheckoutAuthResult';
import { ISkipifyLookupResult, ISkipifySDK } from './types';
import { SkipifySDKLoader } from './SkipifySDKLoader';

class Skipify implements AbstractFastCheckoutProvider {
    private readonly merchantId: string;
    private readonly sdkLoader: SkipifySDKLoader;

    private skipifySdk: ISkipifySDK;

    constructor(environment: string, merchantId: string) {
        this.merchantId = merchantId;
        this.sdkLoader = new SkipifySDKLoader(environment);
    }

    public async initialize(): Promise<void> {
        const Skipify = await this.sdkLoader.load();
        this.skipifySdk = new Skipify({ merchantId: this.merchantId });
    }

    public authenticate(skipifyJson: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const lookupResults: ISkipifyLookupResult = JSON.parse(skipifyJson);

            console.log('Lookup Results', lookupResults);

            const options = {
                onSuccess: authResult => {
                    console.log('Skipify onsuccess', authResult);
                    resolve(authResult);
                },
                onError: error => {
                    console.error('Skipify onerror', error);
                    reject(error);
                },
                sendOtp: false,
                displayMode: 'embedded' // or 'embedded'
            };

            const container = document.getElementById('skipify-auth-div');
            const authComponent = this.skipifySdk.authentication(lookupResults, options);

            authComponent.render(container);
        });
    }
}

export { Skipify };
