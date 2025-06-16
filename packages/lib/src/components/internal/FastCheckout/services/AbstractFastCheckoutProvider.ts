abstract class AbstractFastCheckoutProvider {
    public abstract initialize(): Promise<any>;
    public abstract authenticate(email: string): Promise<any>;
}

export { AbstractFastCheckoutProvider };
