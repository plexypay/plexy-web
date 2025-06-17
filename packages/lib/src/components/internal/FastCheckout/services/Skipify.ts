import { AbstractFastCheckoutProvider } from './AbstractFastCheckoutProvider';
import { FastCheckoutAuthResult } from '../models/FastCheckoutAuthResult';

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
    public authenticate(email: string): Promise<FastCheckoutAuthResult> {
        throw new Error('Method not implemented.');
    }
}

export { Skipify };
