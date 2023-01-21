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
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const [selectedSnailAlias, setSelectedSnailAlias] = useState<Snail['alias'] | null>(null);

    if (error) {
        return null;
    }

    return (
        <div className="flex flex-col items-center" data-cy="popular-snails-root">
            <h2 className="flex gap-2 text-xl font-bold">
                top 10 snails
                <Image src={TrophyIcon} alt="trophy icon" className="h-6 w-auto" />
            </h2>

            <p className="pb-4">click on a snail for more info</p>

            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <Table
                        objects={popularSnailsList}
                        properties={['alias', 'clicks']}
                        onRowClick={(clicked) => setSelectedSnailAlias(clicked.alias)}
                        data-cy="popular-snails-table"
                    />

                    {selectedSnailAlias ? (
                        <Dialog
                            onClose={() => setSelectedSnailAlias(null)}
                            title="snail detail"
                            body={<SnailInfo snailAlias={selectedSnailAlias} hide={['createdAt']} />}
                            actions={[
                                {
                                    label: 'more info',
                                    onClick: () => navigateTo.showSnail(selectedSnailAlias),
                                },
                            ]}
                        />
                    ) : null}
                </>
            )}
        </div>
    );
};
