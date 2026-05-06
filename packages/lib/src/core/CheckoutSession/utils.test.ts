import { sanitizeSession } from './utils';

describe('CheckoutSession utils', () => {
    test('sanitizeSession', () => {
        const sessionMock = {
            id: 'CS123456',
            sessionData: 'ABC12344',
            otherField: '123'
        };

        const expectedSanitizedSession = {
            id: 'CS123456',
            sessionData: 'ABC12344'
        };

        expect(sanitizeSession(sessionMock)).toMatchObject(expectedSanitizedSession);
    });
});
