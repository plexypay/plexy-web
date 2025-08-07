import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { FastCheckout } from '../../../../src/components/utilities';

import './FastCheckoutStory.scss';

export const FastCheckoutAuthentication = ({ checkout }) => {
    const [email, setEmail] = useState<string>(null);
    const [fastcheckout, setFastCheckout] = useState<FastCheckout>();

    const { id, sessionData } = checkout.session.session;

    const initiate = () => {
        const fastcheckout = new FastCheckout({
            session: { id, sessionData },
            environment: 'test',
            clientKey: 'test_L6HTEOAXQBCZJHKNU4NLN6EI7IE6VRRW'
        });
        setFastCheckout(fastcheckout);
    };

    const handleEmailInput = event => {
        setEmail(event.currentTarget.value);
    };

    const handleButtonClick = async () => {
        try {
            const result = await fastcheckout.authenticate(email);
            console.log('FastCheckout Result ::', result);

            if (result.authenticationResult === 'not_found') alert('not found');
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

            <input type="text" id="skipify-auth-input" placeholder="INPUT FIELD FOR OVERLAY. OTP 786786" style={{ width: '300px' }} disabled />
            <div id="skipify-auth-div"></div>
        </section>
    );
};
