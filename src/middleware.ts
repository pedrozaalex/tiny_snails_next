import { Snail } from '@prisma/client';
import { NextMiddleware, NextResponse } from 'next/server';
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

    if (!data) {
        return NextResponse.redirect(BASE_URL + '/404');
    }

    reportClick(data.id, req.ip);

    return NextResponse.redirect(data.url);
};

function reportClick(snailId: number, ip?: string) {
    fetch(`${BASE_URL}/api/click`, {
        method: 'POST',
        body: JSON.stringify({
            snailId,
            ip,
            secret: process.env.SECRET_KEY,
        }),
    })
        .then((res) => res.json())
        .then((data) => console.log('click reported:', data))
        .catch((error) =>
            console.error('error occurred when reporting click:', error)
        );
}

async function fetchSnailByAlias(alias: string): Promise<Snail | null> {
    try {
        const result = (await (
            await fetch(`${BASE_URL}/api/snail?alias=${alias}`)
        ).json()) as Snail | { error: string };

        if ('error' in result) {
            throw new Error(result.error);
        }

        return result;
    } catch (error) {
        console.error('error occurred when fetching url:', error);
        return null;
    }
}
