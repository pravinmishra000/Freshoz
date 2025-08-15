import { Leaf } from 'lucide-react';

export function FreshozLogo() {
  return (
    <a href="/" className="flex items-center gap-2 text-primary-foreground">
      <div className="rounded-lg bg-primary-foreground p-2">
        <Leaf className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h1 className="font-headline text-xl font-bold">Freshoz</h1>
        <p className="text-xs text-primary-foreground/80">Fresh & Fast</p>
      </div>
    </a>
  );
}
