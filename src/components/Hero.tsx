import Image from 'next/image';
import SnailIcon from '../../public/snail.png';

export function AppHero() {
    return (
        <div className="hero">
            <div className="hero-content">
                <div className="max-w-md text-center">
                    <h2 className="text-4xl font-bold inline-flex gap-2">
                        tiny snails
                        <Image
                            src={SnailIcon}
                            alt="snail icon"
                            className="inline-block w-10 aspect-auto"
                        />
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
