
import ContactForm from '@/components/contact-form';

export const metadata = {
  title: 'Contact Us | Game of Stones',
  description: 'Get in touch with our team regarding mining operations, investments, and partnerships.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16 md:px-6 md:pt-28 md:pb-20 min-h-screen flex items-center justify-center">
      <div className="w-full grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
        <div className="space-y-6 animate-in fade-in slide-in-from-left-6 duration-700">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
            We are always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>

          <div className="space-y-4 pt-8 border-t border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Phone</h3>
                <p className="text-muted-foreground">+92 310 9108714</p>
                <p className="text-muted-foreground">+92 317 9023125</p>
                <p className="text-xs text-muted-foreground mt-1">Mon-Fri from 9am to 6pm</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Email</h3>
                <p className="text-muted-foreground">mineszircon@gmail.com</p>
                <p className="text-xs text-muted-foreground">Online support 24/7</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Office</h3>
                <p className="text-muted-foreground">Office 23, Noor Market, Khomer Yarkot, Gilgit, Gilgit Baltistan.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-right-6 duration-700">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
