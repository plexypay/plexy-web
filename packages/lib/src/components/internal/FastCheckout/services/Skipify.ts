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

    public async authenticate(skipifyJson: string): Promise<any> {
        try {
            const lookupResults: ISkipifyLookupResult = JSON.parse(skipifyJson);
            const authenticationResult = await this.renderSkipifyAuthenticationComponent(lookupResults);
            await this.renderSkipifyPaymentComponent(authenticationResult);

            return authenticationResult;
        } catch (error) {
            console.error(error);
        }
    }

    private async renderSkipifyAuthenticationComponent(lookupResults: ISkipifyLookupResult) {
        return new Promise((resolve, reject) => {
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
                sendOtp: true, // bypass the Consent UI and go directly to OTP
                displayMode: 'overlay'
            };

            const container = document.getElementById('skipify-auth-input');
            const authComponent = this.skipifySdk.authentication(lookupResults, options);
            authComponent.render(container);
        });
    }

    private renderSkipifyPaymentComponent(authenticationResult: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const options = {
                // the shopper's selected payment info for checkout
                onSelect: result => {
                    console.log('PaymentCarousel -> onSelect', result);
                    resolve(result);
                },
                // handle your error flow
                onError: error => {
                    console.log('PaymentCarousel -> onError', error);
                    reject(error);
                },
                amount: 450, // your order total as an integer 450 = $4.50
                phone: '', // optional
                config: {
                    // optional
                    theme: 'light', // default theme or "dark"
                    fontFamily: 'default', // default font family is poppins, or "serif", "sans-serif"
                    fontSize: 'medium', // default font size or "small" or "large"
                    inputFieldSize: 'medium' // default input field size or "small"
                }
            };

            // render the Payment Carousel Component at a specified location
            const carouselContainer = document.getElementById('skipify-auth-div');

            // render the Payment Carousel Component based on auth results or lookup results
            this.skipifySdk.carousel(authenticationResult, options).render(carouselContainer);
        });
    }
}

export { Skipify };
