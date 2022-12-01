import { Hero } from '../components/Hero';
import SnailForm from '../components/SnailForm';
import { SnailList } from '../components/SnailList';
import { trpc } from '../utils/trpc';

export default function Home() {
    const utils = trpc.useContext();
    
    const createSnail = trpc.snail.create.useMutation({
        onMutate: () => utils.snail.getPopular.invalidate()
    });

    return (
        <div className="container max-w-3xl mx-auto px-8 flex flex-col gap-12">
            <Hero />

            <SnailForm onSubmit={createSnail.mutate} />

            <SnailList />
        </div>
    );
}
