import { ComponentChildren, h } from 'preact';
import './TimelineWrapper.scss';

interface TimelineWrapperProps {
    children: ComponentChildren;
    className?: string;
}

const TimelineWrapper = ({ children, className }: TimelineWrapperProps) => {
    return <div className={`plexy-checkout-timeline-wrapper ${className}`}>{children}</div>;
};

export { TimelineWrapper };
