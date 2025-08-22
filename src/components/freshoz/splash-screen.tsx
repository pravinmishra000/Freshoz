
'use client';

import { FreshozLogo } from './freshoz-logo';

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-orange-400/20 to-white">
      <div className="relative">
        <div className="animate-pulse absolute -inset-2 bg-green-500/30 rounded-full blur-2xl opacity-50"></div>
        <div className="relative animate-bounce">
            <FreshozLogo />
        </div>
      </div>
       <p className="mt-4 text-lg italic text-green-600 animate-fade-in opacity-0 [--animation-delay:600ms]">
        Fresh &amp; Fast
      </p>
    </div>
  );
}
