import { Fragment, h } from 'preact';
import Img from '../../internal/Img';

export interface CampaignInfoProps {
    logoUrl?: string;
    nonprofitName?: string;
    causeName?: string;
    bannerUrl?: string;
}

export default function CampaignInfo({ logoUrl = '', nonprofitName = '', causeName = '', bannerUrl = '' }: CampaignInfoProps) {
    const backgroundImage = `url(${bannerUrl})`;

    return (
        <Fragment>
            <Img className="plexy-checkout__campaign-background-image" style={{ backgroundImage }} backgroundUrl={bannerUrl} />

            <div className="plexy-checkout__campaign-content">
                {logoUrl && <img src={logoUrl} className="plexy-checkout__campaign-logo" alt={nonprofitName} />}
                <div>
                    {nonprofitName && <div className="plexy-checkout__campaign-title">{nonprofitName}</div>}
                    {causeName && <div className="plexy-checkout__campaign-cause">{causeName}</div>}
                </div>
            </div>
        </Fragment>
    );
}
