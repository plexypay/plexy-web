import { h } from 'preact';
import { http, HttpResponse } from 'msw';
import { FastCheckoutAuthentication } from './components/FastCheckoutAuthentication';
import { Checkout } from '../Checkout';

import type { MetaConfiguration, StoryConfiguration } from '../types';
type FastCheckoutStory = StoryConfiguration<{}>;

const meta: MetaConfiguration<FastCheckoutStory> = {
    title: 'FastCheckout/Default'
};

export const Default = {
    render: checkoutConfig => {
        return <Checkout checkoutConfig={checkoutConfig}>{checkout => <FastCheckoutAuthentication checkout={checkout} />}</Checkout>;
    },
    parameters: {
        msw: {
            handlers: [
                // http.post('https://checkoutshopper-test.adyen.com/checkoutshopper/v1/sessions/:sessionId/providers', () => {
                //     return HttpResponse.json({
                //         sessionData: 'aaa-bbb-ccc',
                //         providers: [
                //             {
                //                 type: 'skipify',
                //                 name: 'Skipify',
                //                 configuration: {
                //                     merchantId: '27c11f77-37ec-4e34-b066-4e645681859b'
                //                 }
                //             }
                //             // {
                //             //     type: 'bolt',
                //             //     configuration: {
                //             //         publishableKey: 'jJlQrGFGXW0w.7bZW4EH8QaWh.6db859dd04fe80a2c5a7ab310aad6d89a3a3695fdf09570b1983e8231c4ed610'
                //             //     },
                //             //     name: 'Bolt'
                //             // }
                //         ]
                //     });
                // }),
                http.post('https://checkoutshopper-test.adyen.com/checkoutshopper/v1/sessions/:sessionId/providers/submit', () => {
                    return HttpResponse.json({
                        sessionData: 'session-data-when-requesting-shopper-details',
                        profile: {
                            shopperEmail: 'alan.watts@example.com',
                            firstName: 'Alan',
                            LastName: 'Watts',
                            telephoneNumber: '+12125550199'
                        },
                        deliveryAddresses: {
                            city: 'Brooklyn',
                            country: 'US',
                            houseNumberOrName: 'apt 3021',
                            postalCode: '10044',
                            stateOrProvince: 'NY',
                            street: '888 main street'
                        },
                        billingAddresses: {
                            city: 'Brooklyn',
                            country: 'US',
                            houseNumberOrName: 'apt 3021',
                            postalCode: '10044',
                            stateOrProvince: 'NY',
                            street: '888 main street'
                        }
                    });
                })
            ]
        }
    }
};

export default meta;
