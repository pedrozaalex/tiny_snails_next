import { FunctionComponent, ReactNode } from 'react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

type Props = {
    children: ReactNode;
};

const Layout: FunctionComponent<Props> = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="bg-neutral">{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
