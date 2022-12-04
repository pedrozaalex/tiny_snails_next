import Image from 'next/image';
import SnailIcon from '../../public/snail.png';

export function AppHero() {
    return (
        <div className="hero">
            <div className="hero-content">
                <div className="max-w-md text-center">
                    <h2 className="inline-flex gap-2 text-4xl font-bold">
                        tiny snails
                        <Image
                            src={SnailIcon}
                            alt="snail icon"
                            className="inline-block aspect-auto w-10"
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
