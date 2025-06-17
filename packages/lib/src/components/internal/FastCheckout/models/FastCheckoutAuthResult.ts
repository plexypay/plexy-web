import type { FastCheckoutProfile } from '../types';

type AuthResult = 'succeeded' | 'failed' | 'canceled' | 'not_found';

class FastCheckoutAuthResult {
    public readonly authenticationResult: AuthResult;
    public readonly profileData: FastCheckoutProfile;
    public readonly error: unknown;

    constructor(authResult: AuthResult, profileData?: FastCheckoutProfile, error?: unknown) {
        this.authenticationResult = authResult;

        if (profileData) this.profileData = profileData;
        if (error) this.error = error;
    }
}

export { FastCheckoutAuthResult };
