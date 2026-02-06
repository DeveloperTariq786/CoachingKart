import { InstituteHeader, InstituteFooter } from '@/core/components/layout';

export default function InstitutionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <InstituteHeader />
            <main className="flex-1">
                {children}
            </main>
            <InstituteFooter />
        </div>
    );
}
