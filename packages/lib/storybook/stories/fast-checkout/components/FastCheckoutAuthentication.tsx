import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { FastCheckout } from '../../../../src/components/utilities';

export const FastCheckoutAuthentication = () => {
    const [email, setEmail] = useState<string>(null);
    const [fastcheckout, setFastCheckout] = useState<FastCheckout>();

    const initiate = () => {
        const fastcheckout = new FastCheckout({ session: { id: 'xxx', sessionData: 'yyyy' }, environment: 'test', clientKey: 'test_XXX' });
        setFastCheckout(fastcheckout);
    };

    const handleEmailInput = event => {
        setEmail(event.currentTarget.value);
    };

    const handleButtonClick = async () => {
        try {
            const result = await fastcheckout.authenticate(email);
            console.log('FastCheckout Result ::', result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        void initiate();
    }, []);

    return (
        <section>
            <div className="section_header">
                <h3>Customer</h3>
            </div>
            <div className="email-container">
                <div className="email-input-wrapper">
                    <input
                        className="input-field"
                        value={email}
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        onInput={handleEmailInput}
                    />
                </div>
                <button className="button" type="button" onClick={handleButtonClick}>
                    Continue
                </button>
            </div>
        </section>
    );
};
