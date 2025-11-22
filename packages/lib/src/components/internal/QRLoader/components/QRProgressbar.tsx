import { h } from 'preact';

const QRProgressbar = ({ percentage }: { percentage: number }) => {
    return (
        <div className="plexy-checkout__qr-loader__progress">
            <span className="plexy-checkout__qr-loader__percentage" style={{ width: `${percentage}%` }} />
        </div>
    );
};

export default QRProgressbar;
