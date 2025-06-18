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
