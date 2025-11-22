import { h, ComponentChildren } from 'preact';
import cx from 'classnames';
import { useCoreContext } from '../../../../core/Context/CoreProvider';
import './Fieldset.scss';
import { getUniqueId } from '../../../../utils/idGenerator';
import { useMemo } from 'preact/hooks';

interface FieldsetProps {
    children: ComponentChildren;
    classNameModifiers?: string[];
    classNamesFields?: string[];
    label?: string;
    description?: string;
    readonly?: boolean;
    id?: string;
}

export default function Fieldset({
    children,
    classNameModifiers: classNameFieldsetModifiers = [],
    classNamesFields = [],
    label,
    readonly = false,
    description,
    id
}: Readonly<FieldsetProps>) {
    const { i18n } = useCoreContext();

    const describedById = useMemo(() => getUniqueId('fieldset-description'), []);

    return (
        <fieldset
            id={id}
            className={cx([
                'plexy-checkout__fieldset',
                ...classNameFieldsetModifiers.map(m => `plexy-checkout__fieldset--${m}`),
                { 'plexy-checkout__fieldset--readonly': readonly }
            ])}
            aria-describedby={description ? describedById : null}
        >
            {label && <legend className="plexy-checkout__fieldset__title">{i18n.get(label)}</legend>}
            {description && (
                <p id={describedById} className="plexy-checkout__fieldset__description">
                    {i18n.get(description)}
                </p>
            )}
            <div className={cx('plexy-checkout__fieldset__fields', classNamesFields)}>{children}</div>
        </fieldset>
    );
}
