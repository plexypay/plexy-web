interface IBoltLoginModal {
    attemptLogin({ email }: { email: string }): Promise<{
        authorizationCode: string;
    }>;
    attach(
        containerId: string,
        options: {
            context: string;
        }
    ): void;
}

export interface IBoltSDK {
    create(
        ui: string,
        options?: {
            autoDetectEmail?: boolean;
        }
    ): IBoltLoginModal;
    on(event: string, callback: Function): void;
    once(event: string, callback: Function): void;
    initialize(publishableKey: string): void;
}

export interface ISkipifySDK {
    // TODO: lookup Not needed. Just added for testing
    lookup({ email, phone }: { email: string; phone?: string }): any;
    authentication(lookupResult: any, options?: any);
}

export interface ISkipifySDKClass {
    new ({ merchantId }: { merchantId: string }): ISkipifySDK;
}

export interface ISkipifyLookupResult {
    challengeId: string;
    flags: {
        potentialPaymentMethods: boolean;
        phoneRequired: boolean;
        partnerProvidedPhone: boolean;
    };
    metadata: {
        maskedEmail: string;
        maskedPhone: string;
    };
    defaults: {
        destination: string;
        maskedChannel: string;
    };
}
