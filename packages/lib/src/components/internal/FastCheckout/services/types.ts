export interface IFastCheckoutProvider {
    authenticate(email: string): Promise<any>;
}

interface BoltCreateOptions {
    autoDetectEmail?: boolean;
}

interface ILoginModalAttachOptions {
    context: string;
}

type BoltLoginResponse = {
    authorizationCode: string;
    loginRedirectUrl?: string; // Might not be needed
    scope: string; // Might not be needed
};

interface ILoginModal {
    attemptLogin({ email }: { email: string }): Promise<BoltLoginResponse>;
    attach(containerId: string, options: ILoginModalAttachOptions): void;
}

export interface IBoltSDK {
    create(ui: string, options?: BoltCreateOptions): ILoginModal;
    on(event: string, callback: Function): void;
    once(event: string, callback: Function): void;
    initialize(publishableKey: string): void;
}
