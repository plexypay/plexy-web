import { h } from 'preact';
import cx from 'classnames';
import './RadioGroup.scss';
import { RadioGroupProps } from './types';
import { getUniqueId } from '../../../../utils/idGenerator';
import { useCoreContext } from '../../../../core/Context/CoreProvider';

export default function RadioGroup(props: RadioGroupProps) {
    const { items, name, onChange, value, isInvalid, uniqueId, ariaLabel, style = 'classic' } = props;

    const { i18n } = useCoreContext();
    const uniqueIdBase = uniqueId?.replace(/[0-9]/g, '').substring(0, uniqueId.lastIndexOf('-'));

    return (
        <div
            className={cx(['plexy-checkout__radio_group', `plexy-checkout__radio_group--${style}`])}
            role={'radiogroup'}
            {...(ariaLabel && { ['aria-label']: ariaLabel })}
        >
            {items.map(item => {
                const uniqueId = getUniqueId(uniqueIdBase);
                return (
                    <div key={item.id} className="plexy-checkout__radio_group__input-wrapper">
                        <input
                            id={uniqueId}
                            type="radio"
                            checked={value === item.id}
                            className="plexy-checkout__radio_group__input"
                            name={name}
                            onChange={onChange}
                            onClick={onChange}
                            value={item.id}
                        />
                        <label
                            className={cx([
                                'plexy-checkout__label__text',
                                'plexy-checkout__radio_group__label',
                                props.className,
                                { 'plexy-checkout__radio_group__label--invalid': isInvalid }
                            ])}
                            htmlFor={uniqueId}
                        >
                            {i18n.get(item.name)}
                        </label>
                    </div>
                );
            })}
        </div>
    );
}

RadioGroup.defaultProps = {
    onChange: () => {},
    items: []
};
