import { Leaf } from 'lucide-react';

export function FreshozLogo() {
  return (
    <div className="flex items-center gap-2 text-white">
      <div className="rounded-lg bg-white p-2">
        <Leaf className="h-6 w-6 text-blue-900" />
      </div>
      <div>
        <h1 className="font-headline text-xl font-bold">Freshoz</h1>
        <p className="text-xs text-gray-300">Fresh & Fast</p>
      </div>
    </div>
  );
}
