
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main className="-mt-14 min-h-screen flex flex-col">
                {children}
            </main>
            <Footer />
        </>
    );
}
