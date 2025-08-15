
import { Leaf } from 'lucide-react';

export function FreshozLogo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <div className="rounded-lg bg-primary p-2">
        <Leaf className="h-6 w-6 text-primary-foreground" />
      </div>
      <div>
        <h1 className="font-headline text-2xl font-bold uppercase text-primary">Freshoz</h1>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Fresh & Fast</p>
      </div>
    </a>
  );
}
