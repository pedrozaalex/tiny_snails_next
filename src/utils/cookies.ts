import { nanoid } from 'nanoid';

export function setCookie(name: string, value: string) {
    if (typeof window !== 'undefined') {
        document.cookie = `${name}=${value}`;
    }
}

export function getCookie(name: string) {
    if (typeof window !== 'undefined') {
        const cookies = document.cookie.split(';');
        const cookie = cookies.find((c) => c.trim().startsWith(`${name}=`));
        if (cookie) {
            return cookie.split('=')[1];
        }
    }
}

export function getVisitorId() {
    const id = getCookie('visitorId');

    if (!id) {
        const newId = nanoid();
        setCookie('visitorId', newId);
        return newId;
    }

    return id;
}
