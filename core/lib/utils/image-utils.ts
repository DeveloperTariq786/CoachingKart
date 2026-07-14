/**
 * Optimizes image URLs using Cloudflare Image Transformation if applicable.
 * Ensures the URL is absolute and starts with https://.
 */
export function getOptimizedImageUrl(
    src: string,
    options: {
        width?: number;
        height?: number;
        quality?: number;
        format?: string;
        fit?: 'cover' | 'contain' | 'scale-down' | 'crop' | 'pad';
        gravity?: 'auto' | 'left' | 'right' | 'top' | 'bottom' | 'center';
        sharpen?: number;       // 0–10
        blur?: number;          // 1–250
        brightness?: number;    // 0.0–10.0  (1 = original)
        contrast?: number;      // 0.0–10.0  (1 = original)
        saturation?: number;    // -1.0–10.0 (1 = original)
        gamma?: number;         // 0.0–10.0  (1 = original)
        rotate?: 0 | 90 | 180 | 270 | 360;
        flip?: boolean;         // horizontal flip
        flop?: boolean;         // vertical flip
        trim?: boolean;         // auto-trim whitespace
        metadata?: 'keep' | 'copyright' | 'none';  // default: none
        background?: string;    // hex color for 'pad' fit e.g. 'rgb(255,255,255)'
        dpr?: number;           // device pixel ratio 1–3
        anim?: boolean;         // false = strip animation (GIF/WebP), saves bytes
    } = {}
): string {
    if (!src) return '';

    // Relative paths, data URLs, blob URLs — return as-is
    if (src.startsWith('/') || src.startsWith('data:') || src.startsWith('blob:')) {
        return src;
    }

    let urlString = src.trim();

    // Prepend https:// if missing
    if (!/^https?:\/\//i.test(urlString)) {
        if (urlString.startsWith('assets.coachingkart.in')) {
            urlString = `https://${urlString}`;
        } else {
            const firstSlash = urlString.indexOf('/');
            const firstDot = urlString.indexOf('.');
            if (firstDot !== -1 && (firstSlash === -1 || firstDot < firstSlash)) {
                urlString = `https://${urlString}`;
            }
        }
    }

    try {
        const url = new URL(urlString);

        if (url.hostname === 'assets.coachingkart.in') {
            const params: string[] = [];

            // ── Dimensions ──────────────────────────────────────────────
            if (options.width) params.push(`width=${options.width}`);
            if (options.height) params.push(`height=${options.height}`);
            if (options.dpr) params.push(`dpr=${options.dpr}`);

            // ── Fit & Gravity ────────────────────────────────────────────
            params.push(`fit=${options.fit ?? 'cover'}`);
            params.push(`gravity=${options.gravity ?? 'auto'}`);

            // ── Quality & Format ─────────────────────────────────────────
            params.push(`quality=${options.quality ?? 85}`);
            params.push(`format=${options.format ?? 'auto'}`);

            // ── Color Adjustments ────────────────────────────────────────
            if (options.brightness !== undefined) params.push(`brightness=${options.brightness}`);
            if (options.contrast !== undefined) params.push(`contrast=${options.contrast}`);
            if (options.saturation !== undefined) params.push(`saturation=${options.saturation}`);
            if (options.gamma !== undefined) params.push(`gamma=${options.gamma}`);

            // ── Sharpening / Blur ────────────────────────────────────────
            if (options.sharpen !== undefined) params.push(`sharpen=${options.sharpen}`);
            if (options.blur !== undefined) params.push(`blur=${options.blur}`);

            // ── Orientation ──────────────────────────────────────────────
            if (options.rotate !== undefined) params.push(`rotate=${options.rotate}`);
            if (options.flip) params.push(`flip=true`);
            if (options.flop) params.push(`flop=true`);

            // ── Misc ─────────────────────────────────────────────────────
            if (options.trim) params.push(`trim=true`);
            if (options.background) params.push(`background=${options.background}`);
            if (options.anim === false) params.push(`anim=false`);
            params.push(`metadata=${options.metadata ?? 'none'}`);

            const paramString = params.join(',');
            return `${url.origin}/cdn-cgi/image/${paramString}${url.pathname}${url.search}`;
        }
    } catch (e) {
        console.error('Error parsing image URL:', e);
    }

    return urlString;
}