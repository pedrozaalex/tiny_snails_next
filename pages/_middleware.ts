import { NextFetchEvent, NextRequest } from 'next/server';

export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
    if (req.nextUrl.pathname.startsWith('/api/get-url')) {
        console.log('middleware returning early');
        return;
    }
};
