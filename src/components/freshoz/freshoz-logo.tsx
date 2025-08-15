import { Leaf } from 'lucide-react';

export function FreshozLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-lg bg-primary p-2">
        <Leaf className="h-6 w-6 text-primary-foreground" />
      </div>
      <div>
        <h1 className="font-headline text-xl font-bold text-primary">Freshoz</h1>
        <p className="text-xs text-muted-foreground">Fresh & Fast</p>
      </div>
    </div>
  );
}
