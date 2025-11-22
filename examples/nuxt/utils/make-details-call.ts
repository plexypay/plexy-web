import type { AdditionalDetailsData } from '@plexy/plexy-web';

export default async function makeDetailsCall(data: AdditionalDetailsData['data']) {
    return await $fetch('/api/paymentDetails', {
        method: 'post',
        body: data
    });
}
