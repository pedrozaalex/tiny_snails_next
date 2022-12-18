import { Snail } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';
import TrophyIcon from '../../public/trophy.png';
import { useDialog } from '../hooks/useDialog';
import { useAppNavigation } from '../hooks/useNavigation';
import { trpc } from '../utils/trpc';
import { SnailInfo } from './SnailInfo';
import { Spinner } from './Spinner';
import { Table } from './Table';

export const PopularSnails = () => {
    const { navigateTo } = useAppNavigation();

    const {
        data: popularSnailsList,
        isLoading,
        error,
    } = trpc.snail.getPopular.useQuery(undefined, {
        refetchInterval: 60 * 1000, // 1 minute
    });

    const [selectedSnailAlias, setSelectedSnailAlias] = useState<
        Snail['alias'] | null
    >(null);

    const [SnailDetailDialog, openSnailDetailDialog] = useDialog({
        title: 'snail detail',
        content: (
            <SnailInfo
                snailAlias={selectedSnailAlias ?? ''}
                hide={['createdAt']}
            />
        ),
        onConfirm: () => navigateTo.showSnail(selectedSnailAlias ?? ''),
        onConfirmLabel: 'more info',
    });

    if (error) {
        return null;
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="flex gap-2 text-xl font-bold">
                top 10 snails
                <Image
                    src={TrophyIcon}
                    alt="trophy icon"
                    width={24}
                    height={24}
                />
            </h2>

            <p className="pb-4">click on a snail for more info</p>

            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <Table
                        objects={popularSnailsList}
                        properties={[
                            {
                                key: 'alias',
                                label: 'alias',
                            },
                            {
                                key: 'clicks',
                                label: 'clicks',
                            },
                        ]}
                        onRowClick={({ alias }) => {
                            setSelectedSnailAlias(alias);
                            openSnailDetailDialog();
                        }}
                    />

                    <SnailDetailDialog />
                </>
            )}
        </div>
    );
};
