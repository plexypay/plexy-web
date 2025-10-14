import { h } from 'preact';
import { render, screen, fireEvent } from '@testing-library/preact';
import ExpirationDate from './ExpirationDate';
import { CoreProvider } from '../../../../../core/Context/CoreProvider';
import { DATE_POLICY_OPTIONAL, DATE_POLICY_REQUIRED, ENCRYPTED_EXPIRY_DATE } from '../../../../internal/SecuredFields/lib/constants';

const renderWithCoreContext = (ui, { i18n = globalThis.i18n } = {}) => {
    return render(
        <CoreProvider i18n={i18n} resources={globalThis.resources} loadingContext="test">
            {ui}
        </CoreProvider>
    );
};

describe('ExpirationDate', () => {
    const defaultProps = {
        label: 'Expiry date',
        onFocusField: jest.fn(),
        expiryDatePolicy: DATE_POLICY_REQUIRED,
        focused: false,
        filled: false,
        error: '',
        isValid: false,
        showContextualElement: false,
        contextualText: 'MM/YY'
    };

    test('should render the component with default props', () => {
        renderWithCoreContext(<ExpirationDate {...defaultProps} />);
        expect(screen.getByText('Expiry date')).toBeInTheDocument();
    });

    test('should show (optional) in the label when expiryDatePolicy is optional', () => {
        renderWithCoreContext(<ExpirationDate {...defaultProps} expiryDatePolicy={DATE_POLICY_OPTIONAL} />);
        expect(screen.getByText('Expiry date (optional)')).toBeInTheDocument();
    });

    test('should call onFocusField when the hint icon is clicked', () => {
        const onFocusField = jest.fn();
        renderWithCoreContext(<ExpirationDate {...defaultProps} onFocusField={onFocusField} />);

        const hintIcon = screen.getByAltText('Expiry date MM/YY');
        fireEvent.click(hintIcon);

        expect(onFocusField).toHaveBeenCalledWith(ENCRYPTED_EXPIRY_DATE);
    });

    test('should render contextual text when provided', () => {
        renderWithCoreContext(<ExpirationDate {...defaultProps} showContextualElement={true} />);
        expect(screen.getByText('MM/YY')).toBeTruthy();
    });

    test('should have a descriptive alt text for the hint image', () => {
        renderWithCoreContext(<ExpirationDate {...defaultProps} />);
        const hintIcon = screen.getByAltText('Expiry date MM/YY');
        expect(hintIcon).toBeTruthy();
    });

    test('should apply classNameModifiers to the Field component', () => {
        const modifiers = ['custom-modifier-1', 'custom-modifier-2'];
        renderWithCoreContext(<ExpirationDate {...defaultProps} classNameModifiers={modifiers} />);

        const fieldElement = screen.getByTestId('form-field');
        expect(fieldElement).toHaveClass('adyen-checkout__field--custom-modifier-1', 'adyen-checkout__field--custom-modifier-2');
        expect(fieldElement).toHaveClass('adyen-checkout__field--expiryDate');
    });
});
