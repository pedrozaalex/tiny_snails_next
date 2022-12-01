import { NextMiddleware, NextResponse } from 'next/server';
import {
    BASE_URL,
    extractSlug,
    getUrlForAlias,
    isSlugPath,
    reportClick,
} from './utils';

export const config = {
    matcher: '/s/:slug*',
};

export const middleware: NextMiddleware = async (req) => {
    console.log('redirect middleware', req.nextUrl.pathname);

    const path = req.nextUrl.pathname;

    if (!isSlugPath(path)) {
        console.log('not a slug path', path);

        return;
    }

    const slug = extractSlug(path);

    if (!slug) {
        console.log('no slug');

        return;
    }

    const data = await getUrlForAlias(slug);

    if (data) {
        console.log('Redirecting to', data.url);

        reportClick(data.id, req.ip);

        return NextResponse.redirect(data.url);
    }

    return NextResponse.redirect(BASE_URL + '/404');
};
