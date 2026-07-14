'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Header from './MainHeader';
import Footer from './MainFooter';
import BottomNav from './MainBottomNav';

const AUTH_PATHS = new Set(['/login', '/register']);

export function MainLayoutShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = AUTH_PATHS.has(pathname);

    if (isAuthPage) {
        return <>{children}</>;
    }

    return (
        <>
            <Suspense>
                <Header />
            </Suspense>
            <Suspense>{children}</Suspense>
            <BottomNav />
            <Footer />
        </>
    );
}
