
import { Leaf } from 'lucide-react';

export function FreshozLogo() {
  return (
    <a href="/" className="flex items-center gap-2 text-primary-foreground">
      <div className="rounded-lg bg-primary-foreground p-2">
        <Leaf className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h1 className="font-headline text-2xl font-bold uppercase">Freshoz</h1>
        <p className="text-xs uppercase tracking-wider text-primary-foreground/80">Fresh & Fast</p>
      </div>
    </a>
  );
}
