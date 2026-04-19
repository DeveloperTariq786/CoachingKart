import { Suspense } from 'react';
import { Header, Footer, BottomNav } from "@/core/components/layout";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Suspense>
                <Header />
            </Suspense>
            <Suspense>
                {children}
            </Suspense>
            <BottomNav />
            <Footer />
        </>
    );
}
