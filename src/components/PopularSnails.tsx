import { Snail } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';
import TrophyIcon from '../../public/trophy.png';
import { useAppNavigation } from '../hooks/useNavigation';
import { trpc } from '../utils/trpc';
import { Dialog } from './Dialog';
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

    return error ? null : (
        <div className="flex flex-col items-center text-center">
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
                        onRowClick={({ alias }) => setSelectedSnailAlias(alias)}
                    />

                    <Dialog
                        isOpen={selectedSnailAlias !== null}
                        onClose={() => setSelectedSnailAlias(null)}
                        title="snail detail"
                        body={
                            <SnailInfo
                                snailAlias={selectedSnailAlias ?? ''}
                                hide={['createdAt'] as const}
                            />
                        }
                        actions={[
                            {
                                label: 'more info',
                                onClick: () =>
                                    void navigateTo.showSnail(
                                        selectedSnailAlias ?? ''
                                    ),
                            },
                        ]}
                    />
                </>
            )}
        </div>
    );
};
