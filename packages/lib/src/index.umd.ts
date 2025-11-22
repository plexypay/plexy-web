import { PlexyCheckout, Core } from './core/PlexyCheckout';
import { NewableComponent } from './core/core.registry';
import * as components from './components';
import * as utilities from './components/utilities';
import createComponent from './create-component.umd';

const { Dropin, ...Components } = components;
const Classes: NewableComponent[] = Object.keys(Components).map(key => Components[key]);

// Register all Components
PlexyCheckout.register(...Classes);

const PlexyWeb = {
    Core,
    PlexyCheckout,
    createComponent,
    ...components,
    ...utilities
};

if (typeof window !== 'undefined') {
    if (!window.PlexyWeb) window.PlexyWeb = {};
    window.PlexyWeb = PlexyWeb;
}
