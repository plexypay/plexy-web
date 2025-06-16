import { h } from 'preact';
import { http, HttpResponse } from 'msw';
import type { MetaConfiguration, StoryConfiguration } from '../types';

import { FastCheckout } from '../../../src/components/internal/FastCheckout/FastCheckout';

type FastCheckoutStory = StoryConfiguration<{}>;

const meta: MetaConfiguration<FastCheckoutStory> = {
    title: 'FastCheckout/FastCheckout'
};

export const Default = {
    render: () => {
        const fastCheckout = new FastCheckout({
            session: { id: 'xxx', sessionData: 'yyyy' },
            environment: 'test',
            clientKey: 'test_XXX'
        });

        void fastCheckout.authenticate('guilhermemrr@gmail.com').then(providersResponse => {
            console.log(providersResponse);
        });

        return <div>Look at the console</div>;
    },
    parameters: {
        msw: {
            handlers: [
                http.post('https://checkoutshopper-test.adyen.com/checkoutshopper/v1/sessions/:sessionId/providers', () => {
                    return HttpResponse.json({
                        sessionData: 'aaa-bbb-ccc',
                        providers: [
                            {
                                type: 'bolt',
                                configuration: {
                                    publishableKey: 'jJlQrGFGXW0w.7bZW4EH8QaWh.6db859dd04fe80a2c5a7ab310aad6d89a3a3695fdf09570b1983e8231c4ed610'
                                },
                                name: 'Bolt'
                            }
                        ]
                    });
                })
            ]
        }
    }
};

export default meta;
