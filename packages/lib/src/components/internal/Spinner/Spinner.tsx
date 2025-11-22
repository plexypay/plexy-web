import { h } from 'preact';
import './Spinner.scss';

interface SpinnerProps {
    /**
     * Whether the spinner should be rendered inline
     */
    inline?: boolean;

    /**
     * size of the spinner (small/medium/large)
     */
    size?: string;
}

/**
 * Default Loading Spinner
 * @param props -
 */
const Spinner = ({ inline = false, size = 'large' }: SpinnerProps) => (
    <div data-testid="spinner" className={`plexy-checkout__spinner__wrapper ${inline ? 'plexy-checkout__spinner__wrapper--inline' : ''}`}>
        <div className={`plexy-checkout__spinner plexy-checkout__spinner--${size}`} />
    </div>
);

export default Spinner;
