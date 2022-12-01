import { useAutoAnimate } from '@formkit/auto-animate/react';
import { inferRouterOutputs } from '@trpc/server';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { AppRouter } from '../server/routers/_app';

import RefreshIcon from '../../public/refresh.png';

export type PopularSnails =
    inferRouterOutputs<AppRouter>['snail']['getPopular'];

type Props = {
    snails: PopularSnails;
    loading?: boolean;
    onRefresh: () => void;
};

export const SnailList: FunctionComponent<Props> = ({
    snails,
    loading,
    onRefresh = () => {
        // noop
    },
}) => {
    const router = useRouter();

    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>();

    return (
        <>
            <div className="items-center flex flex-col gap-8 overflow-auto w-full max-h-full relative">
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
                                    onClick={() =>
                                        void router.push(`/s/${snail.alias}`)
                                    }
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
                            className={loading ? 'animate-spin' : ''}
                            src={RefreshIcon}
                            alt="refresh"
                            height={16}
                        />
                    </button>
                </span>
            </div>
        </>
    );
};
