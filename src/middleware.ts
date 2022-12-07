import { Click, Snail } from '@prisma/client';
import { NextMiddleware, NextResponse } from 'next/server';
import { inspect } from 'util';
import { BASE_URL, extractSlug, isSlugPath } from './utils/urls';

export const config = {
    matcher: '/s/:slug*',
};

export const middleware: NextMiddleware = async (req) => {
    const path = req.nextUrl.pathname;

    if (!isSlugPath(path)) {
        return;
    }

    const slug = extractSlug(path);

    if (!slug) {
        return;
    }

    const data = await fetchSnailByAlias(slug);

    if (!data.length) {
        return;
    }

    const snail = data[0];

    void reportClick(snail.alias, req.ip);

    return NextResponse.redirect(snail.url);
};

async function fetchSnailByAlias(alias: string): Promise<Snail[]> {
    try {
        const res = await fetch(`${BASE_URL}/api/snail?alias=${alias}`);

        const snails = (await res.json()) as Snail[];
        const cache = res.headers.get('X-Vercel-Cache');

        console.log('fetch snail cache', cache);

        return snails;
    } catch (error) {
        console.error('An error occurred when fetching url:', error);
        return [];
    }
}

async function reportClick(snailAlias: string, ip?: string) {
    try {
        const res = await fetch(`${BASE_URL}/api/click`, {
            method: 'POST',
            body: JSON.stringify({
                snailAlias,
                ip,
                secret: process.env.SECRET_KEY,
            }),
        });

        return (await res.json()) as Click | { error: string };
    } catch (error) {
        return {
            error: `An error occurred when reporting click: ${inspect(error)}`,
        };
    }
}
