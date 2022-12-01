import { useAutoAnimate } from '@formkit/auto-animate/react';
import { inferRouterOutputs } from '@trpc/server';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import TrophyIcon from '../../public/trophy.png';
import { AppRouter } from '../server/routers/_app';

import RefreshIcon from '../../public/refresh.png';

export type PopularSnails =
    inferRouterOutputs<AppRouter>['snail']['getPopular'];

type Props = {
    snails: PopularSnails;
    onRefresh: () => void;
};

export const SnailList: FunctionComponent<Props> = ({
    snails,
    onRefresh = () => {
        // noop
    },
}) => {
    const router = useRouter();

    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>();

    const [, setSelectedSnailId] = useState<number | null>(null);

    const snailSelectHandler = (snailId: number) => {
        setSelectedSnailId((curr) => {
            console.log('curr', curr);
            console.log('snailId', snailId);

            if (curr === snailId) {
                return null;
            }

            return snailId;
        });

        const snail = snails.find((s) => s.id === snailId);

        if (snail) {
            void router.push(`/s/${snail.alias}`);
        }
    };

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

                <div className="overflow-auto w-full max-h-full relative">
                    <table className="table w-full text-center">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>alias</th>
                                <th>clicks</th>
                            </tr>
                        </thead>

                        <tbody ref={parentRef}>
                            {snails.map((snail, index) => {
                                return (
                                    <tr
                                        key={snail.id}
                                        className="hover cursor-pointer"
                                        onClick={snailSelectHandler.bind(
                                            null,
                                            snail.id
                                        )}
                                    >
                                        <th>{index + 1}</th>
                                        <td>{snail.alias}</td>
                                        <td>{snail.clicks}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <span className=" absolute top-0 right-0 z-50">
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={onRefresh}
                        >
                            <Image
                                src={RefreshIcon}
                                alt="refresh"
                                height={16}
                            />
                        </button>
                    </span>
                </div>
            </div>
        </>
    );
};
