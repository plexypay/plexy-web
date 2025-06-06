import { BOLT_PRODUCTION_SDK, BOLT_SANDBOX_SDK } from './config';
import Script from '../../../../utils/Script';
import AdyenCheckoutError from '../../../../core/Errors/AdyenCheckoutError';

import type { IBoltSDK } from './types';

class BoltSDKLoader {
    private readonly environment: string;
    private readonly publishableKey: string;

    constructor(environment: string, publishableKey) {
        this.environment = environment;
        this.publishableKey = publishableKey;
    }

    public async load(): Promise<IBoltSDK> {
        const url = this.environment.toLowerCase().includes('live') ? BOLT_PRODUCTION_SDK : BOLT_SANDBOX_SDK;

        if (this.isSdkIsAvailableOnWindow()) {
            return window.Bolt;
        }

        try {
            const scriptElement = new Script(url, 'body', {}, { publishableKey: this.publishableKey });
            await scriptElement.load();
            return window.Bolt;
        } catch (error: unknown) {
            throw new AdyenCheckoutError(
                'SCRIPT_ERROR',
                `Unable to load Bolt script. Message: ${error instanceof Error ? error.message : 'Unknown error loading Passkey sdk'}`,
                { cause: error }
            );
        }
    }

    private isSdkIsAvailableOnWindow(): boolean {
        return !!window.Bolt;
    }
}

export { BoltSDKLoader };
