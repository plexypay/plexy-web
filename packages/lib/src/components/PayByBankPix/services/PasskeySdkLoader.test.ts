import { PasskeySdkLoader } from './PasskeySdkLoader';
import { getUrlFromMap } from '../../../core/Environment/Environment';
import Script from '../../../utils/Script';
import { mock } from 'jest-mock-extended';
import { AnalyticsModule } from '../../../types/global-types';

jest.mock('../../../core/Environment/Environment', () => ({
    getUrlFromMap: jest.fn()
}));

jest.mock('../../../utils/Script', () => {
    return jest.fn().mockImplementation(() => ({
        load: jest.fn().mockResolvedValue(undefined)
    }));
});

describe('PasskeySdkLoader', () => {
    const mockEnvironment = 'test';
    const mockCdnUrl = 'https://cdn.example.com/';
    const mockPlexyPasskey = { default: { someMethod: jest.fn() } };
    const mockAnalytics = mock<AnalyticsModule>();

    let loader: PasskeySdkLoader;

    beforeEach(() => {
        loader = new PasskeySdkLoader({ environment: mockEnvironment, analytics: mockAnalytics });
        (getUrlFromMap as jest.Mock).mockReturnValue(mockCdnUrl);
        (window as any).PlexyPasskey = mockPlexyPasskey;
    });

    afterEach(() => {
        jest.clearAllMocks();
        delete (window as any).PlexyPasskey;
    });

    it('should load script and set PlexyPasskey', async () => {
        const result = await loader.load();

        expect(getUrlFromMap).toHaveBeenCalledWith(mockEnvironment, expect.anything());
        expect(Script).toHaveBeenCalledWith({
            component: 'paybybank_pix',
            src: `${mockCdnUrl}js/plexypasskey/1.1.0/plexy-passkey.js`,
            analytics: mockAnalytics
        });

        expect(result).toBe(mockPlexyPasskey.default);
    });

    it('should return early if PlexyPasskey is already loaded', async () => {
        await loader.load(); // First time
        const result = await loader.load(); // Second time

        expect(Script).toHaveBeenCalledTimes(1);
        expect(result).toBe(mockPlexyPasskey.default);
    });

    it('should throw PlexyCheckoutError if script fails to load', async () => {
        (Script as unknown as jest.Mock).mockImplementationOnce(() => ({
            load: jest.fn().mockRejectedValue(new Error('Script load failed'))
        }));

        await expect(loader.load()).rejects.toThrow('Unable to load script. Message: Script load failed');
    });
});
