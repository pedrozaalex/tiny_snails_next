import { Click, Snail } from '@prisma/client';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { BASE_URL, extractSlug } from './utils/urls';

async function redirectMiddleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

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
}

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
            error: `An error occurred when reporting click: ${String(error)}`,
        };
    }
}

async function rateLimitMiddleware(req: NextRequest) {
    const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL ?? '',
        token: process.env.UPSTASH_REDIS_REST_TOKEN ?? '',
    });

    const ratelimit = new Ratelimit({
        redis: redis,
        limiter: Ratelimit.fixedWindow(5, '5 s'),
    });

    const identifier = req.ip ?? req.cookies.get('visitorId')?.value ?? '';
    const result = await ratelimit.limit(identifier);

    if (!result.success) {
        return NextResponse.json(
            { error: 'Too many requests' },
            { status: 429 }
        );
    }

    const response = NextResponse.next();
    response.headers.append('X-RateLimit-Limit', result.limit.toString());
    response.headers.append(
        'X-RateLimit-Remaining',
        result.remaining.toString()
    );

    return response;
}

const ignoredPaths = [/^\/_next/, /^\/static/];

const middlewares = [
    [/\/s\/\w+/, redirectMiddleware],
    [/\/api/, rateLimitMiddleware],
] as const;

export const middleware: NextMiddleware = async (req) => {
    const path = req.nextUrl.pathname;

    if (ignoredPaths.some((regex) => regex.test(path))) {
        return;
    }

    for (const [regex, middleware] of middlewares) {
        if (regex.test(path)) {
            return middleware(req);
        }
    }
};
