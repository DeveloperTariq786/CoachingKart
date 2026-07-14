import { Suspense } from 'react';
import { LoginPageContent } from '@/modules/platform/auth';

export const metadata = {
    title: 'Sign In | CoachingKart',
    description: 'Sign in to access your courses and study materials.',
};

export default function LoginPage() {
    return (
        <Suspense>
            <LoginPageContent />
        </Suspense>
    );
}
