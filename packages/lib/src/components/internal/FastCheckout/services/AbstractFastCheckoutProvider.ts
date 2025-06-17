import type { FastCheckoutAuthResult } from '../models/FastCheckoutAuthResult';

abstract class AbstractFastCheckoutProvider {
    public abstract initialize(): Promise<void>;
    public abstract authenticate(email: string): Promise<FastCheckoutAuthResult>;
}

export { AbstractFastCheckoutProvider };
