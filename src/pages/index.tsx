import SnailForm from '../components/SnailForm';
import { trpc } from '../utils/trpc';

export default function Home() {
    const createSnail = trpc.snail.create.useMutation({
        onMutate: console.log,
    });

    return (
        <div className="container max-w-3xl mx-auto px-8">
            <article className="prose">
                <section>
                    <h2 className="text-xl">short links for everybody!</h2>
                    <p>
                        ever wanted to share a link with friends, colleagues or
                        even customers, but your link was way too big and ugly?
                    </p>
                    <p>consider your problems solved!</p>
                    <p>
                        you can now use tiny snails™ and create as many cute
                        short links as you want. try it now below!
                    </p>
                </section>

                <section>
                    <SnailForm
                        onSubmit={(snail) => {
                            console.log('snail', snail);

                            createSnail.mutate(snail);
                        }}
                    />
                </section>
            </article>
        </div>
    );
}
