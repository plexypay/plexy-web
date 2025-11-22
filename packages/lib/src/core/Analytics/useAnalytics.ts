import { useCoreContext } from '../Context/CoreProvider';
import PlexyCheckoutError from '../Errors/PlexyCheckoutError';

const useAnalytics = () => {
    const { analytics } = useCoreContext();

    if (analytics === undefined) {
        throw new PlexyCheckoutError('SDK_ERROR', 'useAnalytics(): analytics module is not defined');
    }

    return {
        analytics
    };
};

export default useAnalytics;
