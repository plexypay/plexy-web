import cx from 'classnames';
import './ButtonGroup.scss';
import { h } from 'preact';

const ButtonGroup = ({ options = [], name, onChange }) => (
    <div className="plexy-checkout__button-group">
        {options.map(({ label, selected, value, disabled }, index) => (
            <label
                key={`${name}${index}`}
                className={cx({
                    'plexy-checkout__button': true,
                    'plexy-checkout__button--selected': selected,
                    'plexy-checkout__button--disabled': disabled
                })}
            >
                <input
                    type="radio"
                    className="plexy-checkout__button-group__input"
                    value={value}
                    checked={selected}
                    onChange={onChange}
                    disabled={disabled}
                />
                <span className="plexy-checkout__button-text">{label}</span>
            </label>
        ))}
    </div>
);

export default ButtonGroup;
