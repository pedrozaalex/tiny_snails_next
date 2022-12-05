import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SnailInfo } from '../../components/SnailInfo';

const SnailPage: NextPage = () => {
    const router = useRouter();

    const { id } = router.query;

    const snailId = parseInt(id as string);

    return (
        <>
            <h1 className="text-center text-4xl font-bold">snail {snailId}</h1>

            <div className="card m-auto w-fit border-2 border-neutral-content bg-base-200 p-8">
                <SnailInfo snailId={snailId} />
            </div>

            <Link className="btn m-auto w-fit" href="/">
                create new snail
            </Link>
        </>
    );
};

export default SnailPage;
