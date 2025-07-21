import { SKIPIFY_PRODUCTION_SDK, SKIPIFY_SANDBOX_SDK } from './config';
import Script from '../../../../utils/Script';
import AdyenCheckoutError from '../../../../core/Errors/AdyenCheckoutError';

import type { ISkipifySDKClass } from './types';

class SkipifySDKLoader {
    private readonly environment: string;

    constructor(environment: string) {
        this.environment = environment;
    }

    public async load(): Promise<ISkipifySDKClass> {
        const url = this.environment.toLowerCase().includes('live') ? SKIPIFY_PRODUCTION_SDK : SKIPIFY_SANDBOX_SDK;

        if (this.isSdkIsAvailableOnWindow()) {
            return window.skipify;
        }

        try {
            const scriptElement = new Script(url, 'body');
            await scriptElement.load();
            return window.skipify;
        } catch (error: unknown) {
            throw new AdyenCheckoutError(
                'SCRIPT_ERROR',
                `Unable to load Skipify script. Message: ${error instanceof Error ? error.message : 'Unknown error'}`,
                { cause: error }
            );
        }
    }

    private isSdkIsAvailableOnWindow(): boolean {
        return !!window.skipify;
    }
}

export { SkipifySDKLoader };
