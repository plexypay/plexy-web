import { httpGet } from './http';
import getTranslations from './get-translations';

jest.mock('./http');
const mockedHttpGet = httpGet as jest.Mock;

const LOADING_CONTEXT = 'https://api.plexypay.com/v2/checkoutshopper/';
const PLEXY_WEB_VERSION = '6.0.0';

beforeEach(() => {
    mockedHttpGet.mockReset();
});

describe('Service: getTranslations', () => {
    test('should request translations', async () => {
        const mockedPtBR = {
            storeDetails: 'Salvar pagamento'
        };
        mockedHttpGet.mockResolvedValue(mockedPtBR);

        const translation = await getTranslations(LOADING_CONTEXT, PLEXY_WEB_VERSION, 'pt-BR');

        expect(mockedHttpGet).toHaveBeenCalledTimes(1);
        expect(mockedHttpGet).toHaveBeenCalledWith({
            errorLevel: 'fatal',
            errorMessage: 'Translations: Failed to fetch translations for locale "pt-BR"',
            loadingContext: 'https://api.plexypay.com/v2/checkoutshopper/',
            path: 'sdk/6.0.0/translations/pt-BR.json'
        });
        expect(translation).toStrictEqual(mockedPtBR);
    });

    test('should request translations for kk-KZ locale', async () => {
        const mockedKkKZ = {
            storeDetails: 'Келесі төлем үшін сақтау'
        };
        mockedHttpGet.mockResolvedValue(mockedKkKZ);

        const translation = await getTranslations(LOADING_CONTEXT, PLEXY_WEB_VERSION, 'kk-KZ');

        expect(mockedHttpGet).toHaveBeenCalledTimes(1);
        expect(mockedHttpGet).toHaveBeenCalledWith({
            errorLevel: 'fatal',
            errorMessage: 'Translations: Failed to fetch translations for locale "kk-KZ"',
            loadingContext: 'https://api.plexypay.com/v2/checkoutshopper/',
            path: 'sdk/6.0.0/translations/kk-KZ.json'
        });
        expect(translation).toStrictEqual(mockedKkKZ);
    });

    test('should fallback to en-US locale if merchant tries to load unsupported locale (en-SA)', async () => {
        const mockedEnUS = {
            storeDetails: 'Save for my next payment'
        };

        mockedHttpGet.mockRejectedValueOnce({
            type: 'NETWORK_ERROR',
            message: 'Translations: Failed to fetch translations for locale "en-SA"'
        });
        mockedHttpGet.mockResolvedValueOnce(mockedEnUS);

        const translation = await getTranslations(LOADING_CONTEXT, PLEXY_WEB_VERSION, 'en-SA');

        expect(mockedHttpGet).toHaveBeenCalledTimes(2);
        expect(mockedHttpGet).toHaveBeenNthCalledWith(1, {
            errorLevel: 'fatal',
            errorMessage: 'Translations: Failed to fetch translations for locale "en-SA"',
            loadingContext: 'https://api.plexypay.com/v2/checkoutshopper/',
            path: 'sdk/6.0.0/translations/en-SA.json'
        });
        expect(mockedHttpGet).toHaveBeenNthCalledWith(2, {
            errorLevel: 'fatal',
            errorMessage: `Translations: Couldn't fetch translation for locale "en-SA" nor the fallback translation "en-US"`,
            loadingContext: 'https://api.plexypay.com/v2/checkoutshopper/',
            path: 'sdk/6.0.0/translations/en-US.json'
        });

        expect(translation).toStrictEqual(mockedEnUS);
    });
});
