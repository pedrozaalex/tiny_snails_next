import { Snail } from '@prisma/client';

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

export const getUrlForAlias = async (slug: string): Promise<Snail | null> => {
    console.log('getting url for alias', slug);

    try {
        const result = (await (
            await fetch(`${BASE_URL}/api/get-url/${slug}`)
        ).json()) as Snail | { error: string };

        if ('error' in result) {
            throw new Error(result.error);
        }

        return result;
    } catch (error) {
        console.log('error occurred when fetching url:', error);
        return null;
    }
};

export const reportClick = (snailId: number, ip?: string) => {
    console.log('reporting click', snailId, ip);

    void fetch(`${BASE_URL}/api/report-click`, {
        method: 'POST',
        body: JSON.stringify({
            snailId,
            ip,
            secret: process.env.SECRET_KEY,
        }),
    });
};

export const isURL = (url: unknown): url is URL => {
    try {
        new URL(url as string);
        return true;
    } catch (error) {
        return false;
    }
};

export const isDate = (date: unknown): date is Date => {
    if (typeof date === 'string') {
        const parsed = Date.parse(date);
        return !isNaN(parsed);
    }

    return date instanceof Date;
};
