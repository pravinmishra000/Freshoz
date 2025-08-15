
import { FreshozLogo } from './freshoz-logo';

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-background">
      <div className="animate-pulse">
        <FreshozLogo />
      </div>
    </div>
  );
}
