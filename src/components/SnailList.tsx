import { useAutoAnimate } from '@formkit/auto-animate/react';
import { inferRouterOutputs } from '@trpc/server';
import { FunctionComponent, useState } from 'react';
import { AppRouter } from '../server/routers/_app';
import { Dialog } from './Dialog';
import { SnailInfo } from './SnailInfo';

export type PopularSnails =
    inferRouterOutputs<AppRouter>['snail']['getPopular'];

type Props = {
    snails: PopularSnails;
};

export const SnailList: FunctionComponent<Props> = ({ snails }) => {
    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>();
    const [selectedSnail, setSelectedSnail] = useState<
        PopularSnails[number] | null
    >(null);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <div className="items-center flex flex-col gap-8 overflow-auto w-full max-h-full relative rounded-lg bg-base-100 border-neutral-content border-2">
                <table className="custom-table table w-full text-center">
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
                                    onClick={() => {
                                        setSelectedSnail(snail);
                                        setIsDialogOpen(true);
                                    }}
                                >
                                    <th>{index + 1}</th>
                                    <td>{snail.alias}</td>
                                    <td>{snail.clicks}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <Dialog isOpen={isDialogOpen}>
                {selectedSnail && <SnailInfo snailId={selectedSnail.id} />}
            </Dialog>
        </>
    );
};
