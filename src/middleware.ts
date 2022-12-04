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
    const path = req.nextUrl.pathname;

    if (!isSlugPath(path)) {
        return;
    }

    const slug = extractSlug(path);

    if (!slug) {
        return;
    }

    const data = await getUrlForAlias(slug);

    if (!data) {
        return NextResponse.redirect(BASE_URL + '/404');
    }

    reportClick(data.id, req.ip);

    return NextResponse.redirect(data.url);
};
