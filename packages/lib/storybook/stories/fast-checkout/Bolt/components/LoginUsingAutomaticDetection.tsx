import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import { Bolt } from '../../../../../src/components/internal/FastCheckout/services/Bolt';

export const LoginUsingAutomaticDetection = () => {
    const initiateBolt = async () => {
        const bolt = new Bolt('test', 'jJlQrGFGXW0w.7bZW4EH8QaWh.6db859dd04fe80a2c5a7ab310aad6d89a3a3695fdf09570b1983e8231c4ed610');
        await bolt.initialize();

        bolt.createLoginModalUsingExistingEmailInput('#email-form-group');
    };

    useEffect(() => {
        void initiateBolt();
    }, []);

    return (
        <section id="email-form-group">
            <div className="section_header">
                <h3>Customer</h3>
            </div>
            <div className="email-container">
                <div className="email-input-wrapper">
                    <input className="input-field" name="email" type="email" placeholder="Email" autoComplete="email" />
                </div>
            </div>
        </section>
    );
};
