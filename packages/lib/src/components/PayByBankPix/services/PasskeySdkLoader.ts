import { IPlexyPasskey } from './types';
import { getUrlFromMap } from '../../../core/Environment/Environment';
import type { CoreConfiguration } from '../../../core/types';
import { CDN_ENVIRONMENTS } from '../../../core/Environment/constants';
import PlexyCheckoutError from '../../../core/Errors/PlexyCheckoutError';
import Script from '../../../utils/Script';
import { AnalyticsModule } from '../../../types/global-types';

export interface IPasskeySdkLoader {
    load(environment: CoreConfiguration['environment'], analytics: AnalyticsModule): Promise<IPlexyPasskey>;
}

class PasskeySdkLoader implements IPasskeySdkLoader {
    private static readonly PASSKEY_SDK_URL = 'js/plexypasskey/1.1.0/plexy-passkey.js';
    private PlexyPasskey: IPlexyPasskey;

    private readonly analytics: AnalyticsModule;
    private readonly environment: string;

    constructor({ analytics, environment }: { analytics: AnalyticsModule; environment: string }) {
        this.analytics = analytics;
        this.environment = environment;
    }

    private isAvailable(): boolean {
        return this.PlexyPasskey != null;
    }

    public async load(): Promise<IPlexyPasskey> {
        if (this.isAvailable()) {
            return this.PlexyPasskey;
        }

        try {
            const cdnUrl = getUrlFromMap(this.environment as CoreConfiguration['environment'], CDN_ENVIRONMENTS);
            const url = `${cdnUrl}${PasskeySdkLoader.PASSKEY_SDK_URL}`;

            const scriptElement = new Script({
                src: url,
                component: 'paybybank_pix',
                analytics: this.analytics
            });

            await scriptElement.load();
            this.PlexyPasskey = window.PlexyPasskey?.default;
            return this.PlexyPasskey;
        } catch (e: unknown) {
            throw new PlexyCheckoutError(
                'SCRIPT_ERROR',
                `Unable to load script. Message: ${e instanceof Error ? e.message : 'Unknown error loading Passkey sdk'}`
            );
        }
    }
}

export { PasskeySdkLoader };
