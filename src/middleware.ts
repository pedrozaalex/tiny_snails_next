import { Snail } from '@prisma/client';
import { NextMiddleware, NextResponse } from 'next/server';
import { extractSlug, isSlugPath } from './utils';

export const middleware: NextMiddleware = async (req) => {
    console.log(req.nextUrl.pathname);

    const path = req.nextUrl.pathname;

    if (!isSlugPath(path)) {
        console.log('middleware returning early');
        return;
    }

    const slug = extractSlug(path);

    const data = (await (
        await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)
    ).json()) as Snail | { error: string };

    console.log('data', data);

    if ('url' in data) {
        return NextResponse.redirect(data.url);
    }
};

export const config = {
    matcher: '/s/:slug*',
};
