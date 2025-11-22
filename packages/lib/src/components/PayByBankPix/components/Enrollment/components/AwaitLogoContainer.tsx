import { h } from 'preact';
import './AwaitLogoContainer.scss';

type Logo = {
    name: string;
    src: string;
    alt: string;
};

export interface IAwaitLogoContainer {
    logos: Logo[];
}

function AwaitLogoContainer({ logos }: Readonly<IAwaitLogoContainer>) {
    return (
        <div className={'plexy-checkout-await-logo-container'}>
            {logos.map(logo => (
                <img
                    key={logo.name}
                    src={logo.src}
                    alt={logo.alt}
                    className={`plexy-checkout__await__brand-logo plexy-checkout-await-logo-${logo.name}`}
                />
            ))}
        </div>
    );
}

export default AwaitLogoContainer;
