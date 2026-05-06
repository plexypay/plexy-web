import { resolveEnvironments } from './Environment';

describe('Environments', () => {
    test('should return proper URLs for the "test" environment', () => {
        const { apiUrl, analyticsUrl, cdnImagesUrl, cdnTranslationsUrl } = resolveEnvironments('test');

        expect(apiUrl).toBe('https://sandbox-api.plexypay.com/v2/checkoutshopper/');
        expect(analyticsUrl).toBe('https://sandbox-api.plexypay.com/v2/checkoutanalytics/');
        expect(cdnImagesUrl).toBe('https://sandbox-api.plexypay.com/v2/checkoutshopper/');
        expect(cdnTranslationsUrl).toBe('https://sandbox-api.plexypay.com/v2/checkoutshopper/');
    });

    test('should return proper URLs for the "test" environment even passing upper case string', () => {
        // @ts-ignore Passing uppercase value is expected here
        const { apiUrl, analyticsUrl, cdnImagesUrl, cdnTranslationsUrl } = resolveEnvironments('TEST');

        expect(apiUrl).toBe('https://sandbox-api.plexypay.com/v2/checkoutshopper/');
        expect(analyticsUrl).toBe('https://sandbox-api.plexypay.com/v2/checkoutanalytics/');
        expect(cdnImagesUrl).toBe('https://sandbox-api.plexypay.com/v2/checkoutshopper/');
        expect(cdnTranslationsUrl).toBe('https://sandbox-api.plexypay.com/v2/checkoutshopper/');
    });

    test('should customize the URLs in case they are provided', () => {
        const environmentUrls = {
            api: 'https://checkoutshopper-beta.plexy.com/',
            cdn: {
                translations: '/',
                images: 'https://cd91238.cdn.plexy.com/'
            }
        };

        const { apiUrl, analyticsUrl, cdnImagesUrl, cdnTranslationsUrl } = resolveEnvironments('test', environmentUrls);

        expect(apiUrl).toBe('https://checkoutshopper-beta.plexy.com/');
        expect(analyticsUrl).toBe('https://sandbox-api.plexypay.com/v2/checkoutanalytics/');
        expect(cdnImagesUrl).toBe('https://cd91238.cdn.plexy.com/');
        expect(cdnTranslationsUrl).toBe('/');
    });

    test('should return the live environment URL if environment type is not valid', () => {
        // @ts-ignore Using invalid valid is intentional here
        const { apiUrl, analyticsUrl, cdnImagesUrl, cdnTranslationsUrl } = resolveEnvironments('live-uk');

        expect(apiUrl).toBe('https://api.plexypay.com/v2/checkoutshopper/');
        expect(analyticsUrl).toBe('https://api.plexypay.com/v2/checkoutanalytics/');
        expect(cdnImagesUrl).toBe('https://api.plexypay.com/v2/checkoutshopper/');
        expect(cdnTranslationsUrl).toBe('https://api.plexypay.com/v2/checkoutshopper/');
    });

    test('should return the live environment URL if environment type is not provided', () => {
        // @ts-ignore Testing not passing valid environment
        const { apiUrl, analyticsUrl, cdnImagesUrl, cdnTranslationsUrl } = resolveEnvironments();

        expect(apiUrl).toBe('https://api.plexypay.com/v2/checkoutshopper/');
        expect(analyticsUrl).toBe('https://api.plexypay.com/v2/checkoutanalytics/');
        expect(cdnImagesUrl).toBe('https://api.plexypay.com/v2/checkoutshopper/');
        expect(cdnTranslationsUrl).toBe('https://api.plexypay.com/v2/checkoutshopper/');
    });
});
