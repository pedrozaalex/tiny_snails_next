import { useRouter } from 'next/router';
import { useRef } from 'react';

export function useAppNavigation() {
    const router = useRouter();

    const ref = useRef({
        navigateTo: {
            home: () => router.push('/'),
            showSnail: (alias: string) => router.push(`/snails/${alias}`),
            mySnails: () => router.push('/snails'),
        },
    });

    return ref.current;
}
