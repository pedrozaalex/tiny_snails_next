import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { DisplayShortlink } from '../../components/DisplayShortlink';
import { SnailInfo } from '../../components/SnailInfo';

const SnailPage: NextPage = () => {
    const router = useRouter();
    const snailId = parseInt(router.query.id as string);

    if (isNaN(snailId)) {
        return null;
    }

    return (
        <div className="flex flex-col items-center gap-12 text-center">
            <h1 className="text-4xl font-bold">snail #{snailId}</h1>

            <DisplayShortlink snailId={snailId} />

            <div className="w-full max-w-sm rounded-lg border-2 border-black bg-base-100 p-4">
                <SnailInfo snailId={snailId} hide={['id', 'alias']} />
            </div>
        </div>
    );
};

export default SnailPage;
