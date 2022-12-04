import { FunctionComponent, ReactNode } from 'react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

type Props = {
    children: ReactNode;
};

const Layout: FunctionComponent<Props> = ({ children }) => {
    return (
        <div className="bg-primary">
            <Navbar />

            <main className="container max-w-3xl mx-auto py-12 px-8 flex flex-col gap-12">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
