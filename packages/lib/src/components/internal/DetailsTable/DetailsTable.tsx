import { h } from 'preact';
import './DetailsTable.scss';
import { CopyIconButton } from '../Button/CopyIconButton';

export interface DetailsTableData
    extends Array<{
        label: string;
        value: string;
    }> {}

export interface DetailsTableProps {
    tableFields: DetailsTableData;
    shouldShowCopyButton?: boolean;
}

export default function DetailsTable({ tableFields, shouldShowCopyButton }: Readonly<DetailsTableProps>) {
    // For context, this markup uses 2 classes for backwards compatibility
    // This was originally part of the voucher component and ported out
    // We can remove the voucher class names at point
    return (
        <dl className="plexy-checkout__voucher-result__details plexy-checkout__details-table">
            {tableFields
                // first remove empty values
                .filter(item => !!item)
                // or objects without label and value
                .filter(({ label, value }) => !!label && !!value)
                .map(({ label, value }) => (
                    <div key={`${label + value}`} className="plexy-checkout__voucher-result__details__item plexy-checkout__details-table__item">
                        <dt className="plexy-checkout__voucher-result__details__label plexy-checkout__details-table__label">{label}</dt>
                        <dd className="plexy-checkout__voucher-result__details__value plexy-checkout__details-table__value">
                            {value}
                            {shouldShowCopyButton && <CopyIconButton text={value}></CopyIconButton>}
                        </dd>
                    </div>
                ))}
        </dl>
    );
}
