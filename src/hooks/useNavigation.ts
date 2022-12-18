import { useRouter } from 'next/router';
import { useRef } from 'react';

export function useAppNavigation() {
    const router = useRouter();

    const ref = useRef({
        navigateTo: {
            homepage: () => void router.push('/'),
            showSnail: (alias: string) => void router.push(`/snails/${alias}`),
            mySnails: () => void router.push('/snails'),
        },
    });

    return ref.current;
}
