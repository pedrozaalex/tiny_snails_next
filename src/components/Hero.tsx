import { SnailIcon } from './SnailIcon';

export function AppHero() {
    return (
        <div className="hero">
            <div className="hero-content">
                <div className="max-w-md text-center">
                    <h2 className="flex items-center justify-center gap-2 text-4xl font-bold">
                        tiny snails
                        <SnailIcon size={48} />
                    </h2>

                    <p className="pt-4 text-lg">
                        now you can share your big ugly links
                    </p>

                    <small>
                        (yes, the name is a word play with the slugs in urls)
                    </small>
                </div>
            </div>
        </div>
    );
}
