
import { Leaf } from 'lucide-react';

export function FreshozLogo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <div className="rounded-lg bg-green-500 p-2">
        <Leaf className="h-6 w-6 text-white" />
      </div>
      <div>
        <h1 className="font-headline text-2xl font-bold uppercase text-green-600">FRESHOZ</h1>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Fresh & Fast</p>
      </div>
    </a>
  );
}
