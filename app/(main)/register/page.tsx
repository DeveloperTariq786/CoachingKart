import { Suspense } from 'react';
import { RegisterPageContent } from '@/modules/platform/auth';

export const metadata = {
    title: 'Register | CoachingKart',
    description: 'Learn how to get your student account on CoachingKart.',
};

export default function RegisterPage() {
    return (
        <Suspense>
            <RegisterPageContent />
        </Suspense>
    );
}
