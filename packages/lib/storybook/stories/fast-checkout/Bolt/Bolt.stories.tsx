import { h } from 'preact';
import { MetaConfiguration, StoryConfiguration } from '../../types';

import { LoginUsingManualHandling } from './components/LoginUsingManualHandling';
import { LoginUsingAutomaticDetection } from './components/LoginUsingAutomaticDetection';

type BoltStory = StoryConfiguration<{}>;

const meta: MetaConfiguration<BoltStory> = {
    title: 'FastCheckout/Bolt'
};

export const ManualHandling = {
    render: () => {
        return <LoginUsingManualHandling />;
    }
};

export const AutomaticDetection = {
    render: () => {
        return <LoginUsingAutomaticDetection />;
    }
};

export default meta;
