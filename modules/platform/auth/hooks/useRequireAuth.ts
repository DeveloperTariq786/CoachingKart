'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '../store/useAuthStore';
import { useAuthHydration } from './useAuthHydration';
import { getLoginUrl } from '../utils/login-redirect';

export function useRequireAuth() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const hasHydrated = useAuthHydration();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    useEffect(() => {
        if (!hasHydrated || isAuthenticated) return;

        const query = searchParams.toString();
        const redirect = `${pathname}${query ? `?${query}` : ''}`;
        router.replace(getLoginUrl({ redirect }));
    }, [hasHydrated, isAuthenticated, pathname, searchParams, router]);

    return { hasHydrated, isAuthenticated };
}
