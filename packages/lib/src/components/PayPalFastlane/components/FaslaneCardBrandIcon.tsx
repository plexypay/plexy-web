import { h } from 'preact';
import useImage from '../../../core/Context/useImage';
import Img from '../../internal/Img';
import { getFullBrandName } from '../../Card/components/CardInput/utils';

interface FastlaneCardBrandIconProps {
    brand: string;
}

function mapFastlaneCardBrandToPlexyBrand(brand: string) {
    return brand === 'mastercard' ? 'mc' : brand;
}

const FastlaneCardBrandIcon = ({ brand }: FastlaneCardBrandIconProps) => {
    const getImage = useImage();
    const mappedBrand = mapFastlaneCardBrandToPlexyBrand(brand);

    return (
        <span className="plexy-checkout-fastlane__card-brand--wrapper">
            <Img src={getImage()(mappedBrand)} alt={getFullBrandName(mappedBrand)} />
        </span>
    );
};

export default FastlaneCardBrandIcon;
