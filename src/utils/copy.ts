function fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (!successful) throw new Error('Fallback: Oops, unable to copy');
        document.body.removeChild(textArea);

        return true;
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        document.body.removeChild(textArea);

        return false;
    }
}

export function copyToClipboard(
    text: string,
    onCopy?: () => void
): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        // This rule must be disabled because the clipboard API is not yet supported in all browsers
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!navigator.clipboard) {
            const success = fallbackCopyTextToClipboard(text);

            if (success) {
                if (onCopy) onCopy();

                resolve();
            }

            reject();
        }

        navigator.clipboard
            .writeText(text)
            .then(() => {
                if (onCopy) onCopy();

                resolve();
            })
            .catch((err) => {
                console.error('Async: Could not copy text: ', err);
                reject();
            });
    });
}
