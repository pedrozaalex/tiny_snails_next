import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { DisplayShortlink } from '../../components/DisplayShortlink';
import { SnailInfo } from '../../components/SnailInfo';

const SnailPage: NextPage = () => {
    const router = useRouter();
    const snailAlias = router.query.alias;

    if (typeof snailAlias !== 'string') {
        return <></>;
    }

    return (
        <>
            <Head>
                <title>snail {snailAlias}</title>
            </Head>

            <div className="flex flex-col items-center gap-12 text-center">
                <h1 className="text-4xl font-bold">snail {snailAlias}</h1>

                <DisplayShortlink snailAlias={snailAlias} />

                <div className="w-full max-w-sm rounded-lg border-2 border-black bg-base-100 p-4">
                    <SnailInfo snailAlias={snailAlias} hide={['alias']} />
                </div>
            </div>
        </>
    );
};

export default SnailPage;
