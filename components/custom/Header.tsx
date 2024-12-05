"use client";


import { useState } from "react";
import { motion } from "motion/react"

export default function Header() {

  const [isSecondAnimation, setIsSecondAnimation] = useState(false);
  return (
    <>
      <div className="flex justify-center items-center">
        <motion.div initial={{ y: -100 }} animate={{ skewX: isSecondAnimation ? [10,-10,10] : 0, y: 20, transition: { duration: isSecondAnimation ? 2 : 1, repeat: isSecondAnimation ? Infinity : 0 } }} className="text-white text-4xl underline decoration-dotted" onAnimationComplete={() => setIsSecondAnimation(true)}>
          <div className="first-letter:text-red-500">Excuse</div>
        </motion.div>
      </div>
    </>
  );
}
