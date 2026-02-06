
export const metadata = {
    title: 'Privacy Policy | Game of Stones',
    description: 'Privacy policy and data protection information for Game of Stones.',
    keywords: ['Privacy Policy', 'Data Protection', 'Game of Stones', 'Mining Data Privacy'],
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 pt-24 pb-16 md:px-6 md:pt-28 md:pb-20 min-h-screen">
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                    Privacy Policy
                </h1>

                <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                    <p>
                        At Game of Stones, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we look after your personal data when you visit our website.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Data We Collect</h2>
                    <p>
                        We may collect personal data that you provide to us directly, such as when you contact us via email or phone. This may include your name, email address, phone number, and any other information you choose to provide.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. How We Use Your Data</h2>
                    <p>
                        We use your personal data to respond to your inquiries, provide information about our mining projects, and improve our services. We do not sell or share your personal data with third parties for marketing purposes.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Data Security</h2>
                    <p>
                        We implement appropriate security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Your Rights</h2>
                    <p>
                        You have the right to request access to, correction of, or deletion of your personal data held by us. Please contact us using the details provided below to exercise these rights.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Changes to This Policy</h2>
                    <p>
                        We may update our privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Contact Us</h2>
                    <p>
                        If you have any questions about this privacy policy, please contact us at <a href="mailto:info@gameofstones.com" className="text-[#D4AF37] hover:underline">info@gameofstones.com</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
