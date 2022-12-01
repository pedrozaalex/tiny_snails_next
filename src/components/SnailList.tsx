import Image from 'next/image';
import { useState } from 'react';
import TrophyIcon from '../../public/trophy.png';
import { trpc } from '../utils/trpc';
import { Spinner } from './Spinner';

export function SnailList() {
    const {
        data: snails,
        error,
        isLoading,
    } = trpc.snail.getPopular.useQuery(undefined, {
        refetchInterval: 60 * 1000,
    });

    const [selectedSnailId, setSelectedSnailId] = useState<number | null>(null);

    const snailSelectHandler = (snailId: number) =>
        setSelectedSnailId((curr) => {
            console.log('curr', curr);
            console.log('snailId', snailId);

            if (curr === snailId) {
                return null;
            }

            return snailId;
        });

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div className="items-center flex flex-col gap-8">
                <section>
                    <h2 className="text-xl font-bold flex gap-2">
                        top snails
                        <Image
                            src={TrophyIcon}
                            alt="trophy icon"
                            width={24}
                            height={24}
                        />
                    </h2>
                    <p>see snails other people have created</p>
                </section>

                <div className="overflow-auto max-w-full max-h-full">
                    <table className="table w-full text-center">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>alias</th>
                                <th>clicks</th>
                            </tr>
                        </thead>

                        <tbody>
                            {snails?.map((snail, index) => (
                                <tr
                                    key={snail.id}
                                    className="cursor-pointer hover"
                                    onClick={snailSelectHandler.bind(
                                        null,
                                        snail.id
                                    )}
                                >
                                    <th>{index + 1}</th>
                                    <td>{snail.alias}</td>
                                    <td>{snail.clicks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
