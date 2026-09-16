import type { Metadata } from 'next';
import { InstituteHeader, InstituteFooter } from '@/core/components/layout';
import { instituteService } from '@/modules/institutes/institute/services/institute.service';
import { notFound } from 'next/navigation';

// Helper to fetch institution data (shared by generateMetadata and layout)
async function getInstitutionData(slug: string) {
    try {
        const response = await instituteService.getInstituteDetails(slug);
        if (response.success && response.data) {
            return response.data;
        }
        return null;
    } catch {
        return null;
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const institution = await getInstitutionData(slug);

    if (!institution) {
        return {
            title: 'Institution Not Found',
            description: 'The requested coaching institute could not be found on CoachingKart.',
        };
    }

    const title = `${institution.name} — Courses, Reviews & More`;
    const description =
        institution.description ||
        `Explore ${institution.name} on CoachingKart — view courses, faculty, results, centers & more. Enroll online today.`;
    const url = `https://coachingkart.in/${slug}`;
    const logoUrl = institution.logo || '/logos/logo_icon.png';

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            type: 'profile',
            title,
            description,
            url,
            siteName: 'CoachingKart',
            images: [
                {
                    url: logoUrl,
                    width: 400,
                    height: 400,
                    alt: `${institution.name} Logo`,
                },
            ],
        },
        twitter: {
            card: 'summary',
            title,
            description,
            images: [logoUrl],
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function InstitutionLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const institution = await getInstitutionData(slug);

    let themeStyles = "";
    if (institution?.theme) {
        const { theme } = institution;
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

    // Build JSON-LD structured data for this institution
    const jsonLd = institution
        ? {
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              '@id': `https://coachingkart.in/${slug}#institution`,
              name: institution.name,
              url: `https://coachingkart.in/${slug}`,
              description:
                  institution.description ||
                  `${institution.name} — a coaching institute on CoachingKart.`,
              ...(institution.logo && { logo: institution.logo }),
              ...(institution.tuitionEmail && { email: institution.tuitionEmail }),
              ...(institution.tuitionPhone && { telephone: institution.tuitionPhone }),
              ...(institution.location && {
                  address: {
                      '@type': 'PostalAddress',
                      streetAddress:
                          typeof institution.location === 'string'
                              ? institution.location
                              : institution.location?.address || '',
                  },
              }),
              parentOrganization: {
                  '@type': 'Organization',
                  name: 'CoachingKart',
                  url: 'https://coachingkart.in',
              },
          }
        : null;

    return (
        <div className="flex flex-col min-h-screen">
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
            />
            {themeStyles && (
                <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
            )}
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
            <InstituteHeader />
            <main className="flex-1">
                {children}
            </main>
            <InstituteFooter />
        </div>
    );
}
