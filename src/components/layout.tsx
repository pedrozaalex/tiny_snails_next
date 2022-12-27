import { Poppins } from '@next/font/google';
import { FunctionComponent, ReactNode } from 'react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

type Props = {
    children: ReactNode;
};

const poppins = Poppins({
    weight: ['400', '700'],
    variable: '--font-poppins',
});

export const Layout: FunctionComponent<Props> = ({ children }) => {
    return (
        <div id="layout-root" className={`flex flex-col bg-primary ${poppins.variable} font-sans`}>
            <Navbar />

            <main className="container mx-auto flex max-w-3xl flex-col gap-12 py-12 px-8">{children}</main>

            <Footer />
        </div>
    );
};
