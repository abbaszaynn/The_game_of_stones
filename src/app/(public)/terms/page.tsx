
export const metadata = {
    title: 'Terms of Service | Game of Stones',
    description: 'Terms and conditions for using Game of Stones services.',
    keywords: ['Terms of Service', 'User Agreement', 'Game of Stones', 'Mining Investment Terms'],
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 pt-24 pb-16 md:px-6 md:pt-28 md:pb-20 min-h-screen">
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                    Terms of Service
                </h1>

                <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                    <p>
                        Welcome to Game of Stones. By accessing or using our website and services, you agree to be bound by these Terms of Service.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Use of Services</h2>
                    <p>
                        Our services are intended for informational purposes regarding our mining operations, investments, and related activities. You agree to use our services only for lawful purposes and in accordance with these terms.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Intellectual Property</h2>
                    <p>
                        All content on this website, including text, graphics, logos, and images, is the property of Game of Stones or its content suppliers and is protected by international copyright laws.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Investment Information</h2>
                    <p>
                        The information provided on this website regarding mining sites and potential yields is based on geological surveys and estimations. Actual results may vary, and this information does not constitute guaranteed financial advice.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Limitation of Liability</h2>
                    <p>
                        Game of Stones shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the services.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Contact</h2>
                    <p>
                        For any questions regarding these terms, please contact us at <a href="mailto:info@gameofstones.com" className="text-[#D4AF37] hover:underline">info@gameofstones.com</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
