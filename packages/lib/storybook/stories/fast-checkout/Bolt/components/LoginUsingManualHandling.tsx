import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { Bolt } from '../../../../../src/components/internal/FastCheckout/services/Bolt';

export const LoginUsingManualHandling = () => {
    const [email, setEmail] = useState<string>(null);
    const [bolt, setBolt] = useState<Bolt>();

    const initiateBolt = async () => {
        const bolt = new Bolt('test', 'jJlQrGFGXW0w.7bZW4EH8QaWh.6db859dd04fe80a2c5a7ab310aad6d89a3a3695fdf09570b1983e8231c4ed610');
        await bolt.initialize();

        setBolt(bolt);
    };

    const handleEmailInput = event => {
        setEmail(event.currentTarget.value);
    };

    const handleButtonClick = () => {
        try {
            void bolt.authenticate(email);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        void initiateBolt();
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
