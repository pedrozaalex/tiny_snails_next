/**
 * @param date The date to format
 * @returns A string representing the date in a human readable format
 *
 * @example
 * // returns in the format 'Dec 31, 2020' if it's in the future
 * formatDate(new Date('2099-12-31'))
 *
 * @example
 * // returns 'just now'
 * formatDate(new Date())
 *
 * @example
 * // returns '1 minute ago'
 * formatDate(new Date(Date.now() - 1000 * 60))
 *
 * @example
 * // returns '1 hour ago'
 * formatDate(new Date(Date.now() - 1000 * 60 * 60))
 *
 * @example
 * // returns the date in the format 'Dec 31' if the date is from the current year
 * formatDate(new Date('2022-12-31'))
 *
 * @example
 * // returns the date in the format 'Dec 31, 2020' if the date is not from the current year
 * formatDate(new Date('2019-12-31'))
 */
export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();

    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diff / 1000 / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);

    if (diff < 0) {
        return `${month} ${day}, ${year}`;
    }

    if (diffInMinutes < 1) {
        return 'just now';
    }

    if (diffInHours < 1) {
        return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    }

    if (diffInDays < 1) {
        return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    }

    if (diffInMonths < 1) {
        return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    }

    if (diffInYears < 1) {
        return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
    }

    if (year === now.getFullYear()) {
        return `${month} ${day}`;
    }

    return `${month} ${day}, ${year}`;
}
