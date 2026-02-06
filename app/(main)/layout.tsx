import { Header, Footer, BottomNav } from "@/core/components/layout";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            {children}
            <BottomNav />
            <Footer />
        </>
    );
}
