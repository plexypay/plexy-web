import { h } from 'preact';
import { MetaConfiguration, StoryConfiguration } from '../../../storybook/types';
import { ComponentContainer } from '../../../storybook/components/ComponentContainer';
import { GooglePayConfiguration } from './types';
import GooglePay from './GooglePay';
import { Checkout } from '../../../storybook/components/Checkout';

type GooglePayStory = StoryConfiguration<GooglePayConfiguration>;

const meta: MetaConfiguration<GooglePayConfiguration> = {
    title: 'Components/Wallets/GooglePay',
    argTypes: {
        currency: {
            control: 'select',
            options: ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'SEK', 'NOK', 'DKK', 'PLN', 'BRL', 'KZT']
        }
    },
    args: {
        currency: 'USD'
    }
};

export const Default: GooglePayStory = {
    render: ({ componentConfiguration, ...checkoutConfig }) => (
        <Checkout checkoutConfig={checkoutConfig}>
            {checkout => <ComponentContainer element={new GooglePay(checkout, componentConfiguration)} />}
        </Checkout>
    ),
    args: {
        componentConfiguration: {
            configuration: {
                merchantId: process.env.GOOGLE_PAY_MERCHANT_ID || 'TEST_MERCHANT_ID',
                gatewayMerchantId: 'TestMerchant'
            }
        }
    }
};

export default meta;
