
import { FreshozLogo } from './freshoz-logo';
import Link from 'next/link';

export function Footer() {
  const storePhoneNumber = '9097882555';

  return (
    <footer className="border-t bg-muted/40 hidden md:block">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex-shrink-0">
            <FreshozLogo />
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-primary">About Us</Link>
            <a href={`tel:${storePhoneNumber}`} className="hover:text-primary">Contact: {storePhoneNumber}</a>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Freshoz.in. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
