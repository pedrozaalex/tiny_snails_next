const slugRegex = /\/s\/\w+/;

export function isSlugPath(pathname: string) {
    return pathname.match(slugRegex);
}

export function extractSlug(url: string): string | null {
    return url.split('/s/').pop() || null;
}
