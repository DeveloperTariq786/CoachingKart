'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

export function useAuthHydration(): boolean {
    const [hasHydrated, setHasHydrated] = useState(false);

    useEffect(() => {
        const unsub = useAuthStore.persist.onFinishHydration(() => {
            setHasHydrated(true);
        });
        if (useAuthStore.persist.hasHydrated()) {
            setHasHydrated(true);
        }
        return () => {
            unsub();
        };
    }, []);

    return hasHydrated;
}
