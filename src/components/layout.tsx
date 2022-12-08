import { FunctionComponent, ReactNode } from 'react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

type Props = {
    children: ReactNode;
};

const Layout: FunctionComponent<Props> = ({ children }) => {
    return (
        <div className="flex flex-col bg-primary">
            <Navbar />

            <main className="container mx-auto flex max-w-3xl flex-col gap-12 py-12 px-8">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
