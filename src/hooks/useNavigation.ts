import { useRouter } from 'next/router';

export function useAppNavigation() {
    const router = useRouter();

    return {
        navigateTo: {
            home: () => router.push('/'),
            showSnail: (alias: string) => router.push(`/snails/${alias}`),
            mySnails: () => router.push('/snails'),
        },
    };
}
