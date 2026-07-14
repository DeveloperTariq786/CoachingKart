const RESERVED_PATHS = new Set(['institutions', 'tuitions', 'about', 'careers', 'profile', 'login', 'register']);

export function extractSlugFromPath(path: string): string | undefined {
    const segments = path.split('/').filter(Boolean);
    const first = segments[0];
    if (!first || RESERVED_PATHS.has(first)) return undefined;
    return first;
}

export function getLoginUrl(options?: { redirect?: string; slug?: string }): string {
    const params = new URLSearchParams();
    if (options?.redirect) params.set('redirect', options.redirect);
    const slug = options?.slug ?? (options?.redirect ? extractSlugFromPath(options.redirect) : undefined);
    if (slug) params.set('slug', slug);
    const qs = params.toString();
    return `/login${qs ? `?${qs}` : ''}`;
}

export function getRegisterUrl(options?: { redirect?: string; slug?: string; institutionId?: string }): string {
    const params = new URLSearchParams();
    if (options?.redirect) params.set('redirect', options.redirect);
    const slug = options?.slug ?? (options?.redirect ? extractSlugFromPath(options.redirect) : undefined);
    if (slug) params.set('slug', slug);
    if (options?.institutionId) params.set('institutionId', options.institutionId);
    const qs = params.toString();
    return `/register${qs ? `?${qs}` : ''}`;
}

export function getSafeRedirectUrl(redirect: string | null | undefined, fallback = '/'): string {
    if (!redirect || !redirect.startsWith('/') || redirect.startsWith('//')) {
        return fallback;
    }
    return redirect;
}

export function parseBatchRedirectPath(path: string): {
    slug: string;
    courseSlug: string;
    batchSlug: string;
} | null {
    const segments = path.split('/').filter(Boolean);
    if (segments.length < 3) return null;

    const [slug, courseSlug, batchSlug] = segments;
    if (!slug || !courseSlug || !batchSlug || RESERVED_PATHS.has(slug)) {
        return null;
    }

    return { slug, courseSlug, batchSlug };
}

export function getBatchRedirectFallback(path: string, fallback = '/'): string {
    const parsed = parseBatchRedirectPath(path);
    if (!parsed) return fallback;
    return `/${parsed.slug}/${parsed.courseSlug}`;
}
