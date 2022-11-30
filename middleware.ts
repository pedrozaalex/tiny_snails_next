import { Snail } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    console.log(req.nextUrl.pathname);

    if (req.nextUrl.pathname.startsWith('/api/get-url')) {
        console.log('middleware returning early');
        return;
    }

    const slug = req.nextUrl.pathname.split('/').pop();

    const data = (await (
        await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)
    ).json()) as Snail | { error: string };

    console.log(data);

    if ('url' in data) {
        return NextResponse.redirect(data.url);
    }
}
