import { h } from 'preact';
import { useState } from 'preact/hooks';
import classNames from 'classnames';
import { RadioButtonIconProps } from './types';
import './RadioButtonIcon.scss';

const RadioButtonIcon = ({ dataValue, imageURL, altName, showRadioIcon }: RadioButtonIconProps) => {
    const [hasLoaded, setHasLoaded] = useState(false);

    const handleError = () => {
        setHasLoaded(false);
    };

    const handleLoad = () => {
        setHasLoaded(true);
    };

    const fieldClassnames = classNames({
        'plexy-checkout__input-icon': true,
        'plexy-checkout__input-icon--hidden': !hasLoaded,
        'plexy-checkout__input-icon--no-radio-icon': !showRadioIcon
    });

    return <img className={fieldClassnames} onError={handleError} onLoad={handleLoad} alt={altName} src={imageURL} data-value={dataValue} />;
};

export default RadioButtonIcon;
