import { mapGooglePayBrands } from './map-plexy-brands-to-googlepay-brands';

describe('mapGooglePayBrands()', () => {
    it('should correctly map a list of known Plexy brand codes', () => {
        const plexyBrands = ['mc', 'visa', 'amex'];
        const expected = ['MASTERCARD', 'VISA', 'AMEX'];
        const result = mapGooglePayBrands(plexyBrands);

        expect(result).toEqual(expected);
    });

    it('should ignore any unknown or unsupported brand codes in the list', () => {
        const plexyBrands = ['mc', 'unsupported_brand', 'visa'];
        const expected = ['MASTERCARD', 'VISA'];
        const result = mapGooglePayBrands(plexyBrands);

        expect(result).toEqual(expected);
    });

    it('should return a unique list of brands even if the input contains duplicates', () => {
        const plexyBrands = ['mc', 'visa', 'mc'];
        const expected = ['MASTERCARD', 'VISA'];
        const result = mapGooglePayBrands(plexyBrands);

        expect(result.length).toBe(2);
        expect(result).toEqual(expected);
    });

    it('should return an empty array when given an empty array', () => {
        const plexyBrands: string[] = [];
        const result = mapGooglePayBrands(plexyBrands);

        expect(result).toEqual([]);
    });

    it('should return an empty array if all provided brands are unknown', () => {
        const plexyBrands = ['unknown1', 'unknown2'];
        const result = mapGooglePayBrands(plexyBrands);

        expect(result).toEqual([]);
    });

    it('should correctly map all supported Plexy brands', () => {
        const allPlexyBrands = ['mc', 'amex', 'visa', 'elodebit', 'elo', 'interac', 'discover', 'jcb', 'electron', 'maestro'];
        const allExpectedGooglePayBrands: google.payments.api.CardNetwork[] = [
            'MASTERCARD',
            'AMEX',
            'VISA',
            'ELO_DEBIT',
            'ELO',
            'INTERAC',
            'DISCOVER',
            'JCB',
            'ELECTRON',
            'MAESTRO'
        ];

        const result = mapGooglePayBrands(allPlexyBrands);

        expect(result.length).toBe(allExpectedGooglePayBrands.length);
        expect(result).toEqual(allExpectedGooglePayBrands);
    });
});
