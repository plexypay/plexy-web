import classNames from 'classnames';
import { h } from 'preact';
import './PaymentMethodName.scss';

const PaymentMethodName = ({ displayName, additionalInfo, isSelected }) => (
    <span className={'plexy-checkout__payment-method__name_wrapper'}>
        <span
            className={classNames({
                'plexy-checkout__payment-method__name': true,
                'plexy-checkout__payment-method__name--selected': isSelected
            })}
        >
            {displayName}
        </span>

        {additionalInfo && (
            <span
                className={classNames({
                    'plexy-checkout__payment-method__additional-info': true,
                    'plexy-checkout__payment-method__additional-info--selected': isSelected
                })}
            >
                {additionalInfo}
            </span>
        )}
    </span>
);

export default PaymentMethodName;
