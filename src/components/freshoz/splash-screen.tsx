import { motion } from "framer-motion";
import { FreshozLogo } from "./freshoz-logo";

export default function SplashScreen() {
  return (
    <motion.div
        key="splash"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center 
                    bg-gradient-to-b from-green-500 via-green-100 to-white">
      
      {/* Logo with white glow background */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative"
      >
        <div className="absolute inset-0 blur-md bg-white/70 rounded-full"></div>
        <div className="relative z-10 drop-shadow-md">
          <FreshozLogo />
        </div>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20, letterSpacing: "-0.5px" }}
        animate={{ opacity: 1, y: 0, letterSpacing: "2px" }}
        transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
        className="mt-6 text-2xl font-semibold text-black text-center"
      >
        Fresh &amp; Fast
      </motion.p>
    </motion.div>
  );
}
