import classNames from 'classnames';
import { ComponentChildren, h } from 'preact';
import './ExpandButton.scss';

interface ExpandButton {
    buttonId: string;
    isSelected: boolean;
    expandContentId: string;
    children?: ComponentChildren;
    showRadioButton?: boolean;
    classNameModifiers?: string[];
    standalone?: boolean;
}

function ExpandButton({
    buttonId,
    showRadioButton,
    isSelected,
    expandContentId,
    children,
    classNameModifiers = [],
    standalone = false
}: Readonly<ExpandButton>) {
    // If we only have a single payment method we should use a div instead of toggable button
    if (standalone) {
        return (
            <div className={classNames('plexy-checkout__payment-method__header__title', 'plexy-checkout__payment-method__header__title--standalone')}>
                {children}
            </div>
        );
    }

    return (
        // See discussion: https://github.com/w3c/aria/issues/1404
        // this has been disabled as we got quite a few complains
        // mainly from merchants running automated systems
        <button
            className={classNames(
                'plexy-checkout__payment-method__header__title',
                ...classNameModifiers.map(modifier => `plexy-checkout-expand-button--${modifier}`)
            )}
            id={buttonId}
            role={'radio'}
            aria-checked={isSelected}
            //aria-expanded={isSelected} - disabled for now
            aria-controls={expandContentId}
            type="button"
        >
            {showRadioButton && (
                <span
                    className={classNames({
                        'plexy-checkout__payment-method__radio': true,
                        'plexy-checkout__payment-method__radio--selected': isSelected
                    })}
                    aria-hidden="true"
                />
            )}
            {children}
        </button>
    );
}

export default ExpandButton;
