import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SnailInfo } from '../../components/SnailInfo';

const SnailPage: NextPage = () => {
    const router = useRouter();

    const { id } = router.query;

    const snailId = parseInt(id as string);

    return (
        <div className="flex flex-col items-center gap-12 text-center">
            <h1 className="text-4xl font-bold">snail {snailId}</h1>

            <div className="w-full max-w-xs rounded-lg border-2 border-black bg-base-100 p-4">
                <SnailInfo snailId={snailId} />
            </div>

            <Link className="btn m-auto w-fit" href="/">
                create new snail
            </Link>
        </div>
    );
};

export default SnailPage;
