import { InstituteHeader, InstituteFooter } from '@/core/components/layout';
import { instituteService } from '@/modules/institutes/institute/services/institute.service';

export default async function InstitutionLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    let themeStyles = "";
    try {
        const response = await instituteService.getInstituteDetails(slug);
                if (response.success && response.data?.theme) {
            const { theme } = response.data;
            themeStyles = `
                :root {
                    ${theme.primary ? `--primary-500: ${theme.primary};` : ''}
                    ${theme.primary ? `--media-brand: ${theme.primary};` : ''}
                    ${theme.secondary ? `--secondary: ${theme.secondary};` : ''}
                    ${theme.accent ? `--accent: ${theme.accent};` : ''}
                    ${theme.background ? `--background: ${theme.background};` : ''}
                    ${theme.foreground ? `--foreground: ${theme.foreground};` : ''}
                }
            `;
        }
    } catch (error) {
        console.error("Failed to fetch institute theme:", error);
    }

    return (
        <div className="flex flex-col min-h-screen">
            {themeStyles && (
                <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
            )}
            <InstituteHeader />
            <main className="flex-1">
                {children}
            </main>
            <InstituteFooter />
        </div>
    );
}
