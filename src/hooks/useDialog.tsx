import { FunctionComponent, ReactNode, useState } from 'react';
import { Dialog } from '../components/Dialog';

type Props = {
    title: string;
    content: ReactNode;
    onConfirm: () => void;
    onConfirmLabel?: string;
};

export function useDialog({
    title,
    content,
    onConfirm,
    onConfirmLabel = 'confirm',
}: Props): [FunctionComponent, () => void] {
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    const CustomDialog = () => (
        <Dialog
            isOpen={isOpen}
            onClose={closeDialog}
            title={title}
            body={content}
            actions={[
                {
                    label: onConfirmLabel,
                    onClick: () => {
                        onConfirm();
                        closeDialog();
                    },
                },
            ]}
        />
    );

    return [CustomDialog, openDialog];
}
