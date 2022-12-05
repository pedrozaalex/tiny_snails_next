const slugRegex = /\/s\/\w+/;

export function isSlugPath(pathname: string) {
    return pathname.match(slugRegex);
}

export function extractSlug(url: string): string | null {
    return url.split('/s/').pop() ?? null;
}

export function getBaseUrl() {
    if (typeof window !== 'undefined')
        // browser should use relative path
        return '';

    if (process.env.NEXT_PUBLIC_VERCEL_URL)
        return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

    // assume localhost
    return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const BASE_URL = getBaseUrl();