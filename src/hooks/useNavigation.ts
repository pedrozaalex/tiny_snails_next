import { useRouter } from 'next/router';

export function useAppNavigation() {
    const router = useRouter();

    return {
        navigateTo: {
            home: () => router.push('/'),
            showSnail: (id: number) => router.push(`/snail/${id}`),
        },
    };
}
