import type { FastCheckoutAuthResult } from '../models/FastCheckoutAuthResult';

abstract class AbstractFastCheckoutProvider {
    public abstract initialize(): Promise<void>;
    public abstract authenticate(authCredential: string): Promise<FastCheckoutAuthResult>;
}

export { AbstractFastCheckoutProvider };
