import { motion } from "framer-motion";

export default function AuthBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#F7F8F5]">

      {/* Top Left Blob */}
      <motion.div
        animate={{
          x: [0, 25, 0],
          y: [0, 25, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
       className="absolute -top-32 -left-24 h-72 w-72 sm:h-96 sm:w-96 lg:h-130 lg:w-130 rounded-full bg-[#556B2F]/15 blur-[90px] sm:blur-[110px] lg:blur-[140px]"
      />

      {/* Bottom Right Blob */}
      <motion.div
        animate={{
          x: [0, -35, 0],
          y: [0, -20, 0],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-20 -right-16 h-64 w-64 sm:h-80 sm:w-80 lg:h-112.5 lg:w-112.5 rounded-full bg-[#AFCB7E]/25 blur-[80px] sm:blur-[100px] lg:blur-[130px]"
      />

      {/* Center Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
       className="absolute left-1/2 top-1/2 h-44 w-44 sm:h-60 sm:w-60 lg:h-72 lg:w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[70px] sm:blur-[90px] lg:blur-[120px]"
      />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 hidden sm:block opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(85,107,47,0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(85,107,47,0.25) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Noise Texture */}
      <div
       className="absolute inset-0 hidden md:block opacity-[0.025] mix-blend-soft-light"
        style={{
          backgroundImage:
            "radial-gradient(rgba(85,107,47,0.35) 0.6px, transparent 0.6px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Radial Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 30%, rgba(247,248,245,0.7) 100%)",
        }}
      />
    </div>
  );
}