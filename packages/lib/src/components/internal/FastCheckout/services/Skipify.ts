import { AbstractFastCheckoutProvider } from './AbstractFastCheckoutProvider';

// TODO
class Skipify implements AbstractFastCheckoutProvider {
    private readonly merchantId: string;

    constructor(merchantId: string) {
        this.merchantId = merchantId;
    }

    public initialize(): Promise<any> {
        throw new Error('Method not implemented.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public authenticate(email: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
}

export { Skipify };
