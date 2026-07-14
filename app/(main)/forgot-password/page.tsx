import { Suspense } from 'react';
import { ResetPasswordPageContent } from '@/modules/platform/auth';

export const metadata = {
    title: 'Reset Password | CoachingKart',
    description: 'Reset your password to regain access to your account.',
};

export default function ForgotPasswordPage() {
    return (
        <Suspense>
            <ResetPasswordPageContent />
        </Suspense>
    );
}
