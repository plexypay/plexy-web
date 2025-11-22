import getCurrency from './getCurrency';
import { getSearchParameters } from '../utils';

const DEFAULT_LOCALE = 'ru-RU';
const DEFAULT_COUNTRY = 'KZ';

const urlParams = getSearchParameters(window.location.search);
const merchantAccount = urlParams.merchantAccount;
export const shopperLocale = urlParams.shopperLocale || urlParams.shopperlocale || DEFAULT_LOCALE;
export const countryCode = urlParams.countryCode || urlParams.countrycode || DEFAULT_COUNTRY;
export const currency = 'KZT'; // getCurrency(countryCode);
export const amountValue = urlParams.amount ?? 10001;
export const shopperReference = 'test_external_shopper_reference';
export const amount = {
    currency,
    value: Number(amountValue)
};

export const useSession = urlParams.session !== 'manual';

export const returnUrl = `${window.location.protocol}//localhost:3020/result`;

export default {
    amount,
    countryCode,
    shopperLocale,
    channel: 'Web',
    shopperReference,
    ...(merchantAccount && { merchantAccount })
};

// Force translations to be loaded from the local server path in Playground
export const environmentUrlsOverride = {
    _environmentUrls: {
        cdn: {
            translations: '/'
        }
    }
};
