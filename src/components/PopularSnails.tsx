import Image from 'next/image';
import TrophyIcon from '../../public/trophy.png';
import { trpc } from '../utils/trpc';
import { SnailList } from './SnailList';

export const PopularSnails = () => {
    const {
        data: popularSnailsList,
        isLoading,
        error,
    } = trpc.snail.getPopular.useQuery(undefined, {
        refetchInterval: 60 * 1000, // 1 minute
    });

    return error ? null : (
        <div className="flex flex-col items-center text-center">
            <h2 className="text-xl font-bold flex gap-2">
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
                <p>loading...</p>
            ) : (
                <SnailList snails={popularSnailsList} />
            )}
        </div>
    );
};
