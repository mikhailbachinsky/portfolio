import React from 'react';
import { motion } from 'motion/react';

export const Hero3DComposition: React.FC = () => {
  return (
    <div className="relative w-full h-[375px] sm:h-[420px] md:h-[460px] lg:h-[520px] xl:h-[590px] 2xl:h-[640px] flex items-center justify-center select-none">
      {/* Ambient background glow behind the composition */}
      <div 
        className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[400px] md:w-[460px] lg:w-[540px] xl:w-[640px] h-[340px] sm:h-[400px] md:h-[460px] lg:h-[540px] xl:h-[640px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.24) 0%, rgba(5, 150, 105, 0.12) 40%, rgba(2, 44, 34, 0.03) 65%, transparent 75%)',
          filter: 'blur(35px)',
        }}
      />
      <div 
        className="absolute top-[26%] left-[28%] w-[190px] sm:w-[220px] md:w-[250px] lg:w-[280px] h-[190px] sm:h-[220px] md:h-[250px] lg:h-[280px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, rgba(6, 182, 212, 0.08) 45%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* 1. VIP Flight Ticket (Upper Left) */}
      <motion.div
        initial={{ scale: 0.92, rotate: 20, x: -10 }}
        animate={{ scale: 1, rotate: 24, x: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
        className="absolute top-[1%] sm:top-[2%] md:top-[1%] lg:top-[2%] left-[0%] sm:left-[2%] md:left-[1%] lg:left-[4%] xl:left-[8%] z-10 w-[110px] sm:w-[130px] md:w-[155px] lg:w-[185px] xl:w-[215px]"
      >
        <motion.div
          animate={{
            y: [3, -5, 3],
            rotate: [23, 25.5, 23],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <img
            src="/assets/hero-ticket.webp"
            alt="LSA VIP Ticket"
            className="w-full h-auto object-contain -scale-x-100 -scale-y-100 drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)]"
          />
        </motion.div>
      </motion.div>

      {/* 2. Left Balloon Dog (Mid-Left) */}
      <motion.div
        initial={{ y: 20, rotate: -18 }}
        animate={{ y: 0, rotate: -12 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.08 }}
        className="absolute top-[32%] sm:top-[30%] md:top-[26%] lg:top-[26%] left-[-4%] sm:left-[-4%] md:left-[-6%] lg:left-[-5%] xl:left-[-6%] z-10 w-[110px] sm:w-[130px] md:w-[155px] lg:w-[185px] xl:w-[215px]"
      >
        <motion.div
          animate={{
            y: [-4, 4, -4],
            rotate: [-12, -9.5, -12],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <img
            src="/assets/hero-balloon-cyan.webp"
            alt="Cyan Balloon Dog Left"
            className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
          />
        </motion.div>
      </motion.div>

      {/* 3. Centerpiece: Themis Statue & Emerald Pedestal (~1.5x larger on mobile) */}
      <motion.div
        initial={{ scale: 0.96, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
        className="relative z-20 flex items-center justify-center w-[395px] sm:w-[440px] md:w-[470px] lg:w-[540px] xl:w-[680px] 2xl:w-[780px] shrink-0"
      >
        <motion.div
          animate={{
            y: [-3, 4, -3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative"
        >
          <img
            src="/assets/hero-themis.webp"
            alt="Themis Statue on Emerald Pedestal"
            className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
          />
        </motion.div>
      </motion.div>

      {/* 4. Right Balloon Dog (Lower Right, Mirrored) */}
      <motion.div
        initial={{ y: 20, rotate: 18 }}
        animate={{ y: 0, rotate: 22 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
        className="absolute top-[36%] sm:top-[34%] md:top-[30%] lg:top-[30%] right-[-2%] sm:right-[-1%] md:right-[-2%] lg:right-[0%] xl:right-[1%] z-10 w-[105px] sm:w-[135px] md:w-[170px] lg:w-[200px] xl:w-[230px]"
      >
        <motion.div
          animate={{
            y: [4, -4, 4],
            rotate: [21, 23.5, 21],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <img
            src="/assets/hero-balloon-cyan.webp"
            alt="Cyan Balloon Dog Right"
            className="w-full h-auto object-contain scale-x-[-1] drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
