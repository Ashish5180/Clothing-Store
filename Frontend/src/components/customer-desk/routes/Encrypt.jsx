import { useRef, useState, useEffect } from "react";
import { FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const TARGET_TEXT = "Logout Account";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

const EncryptButton = () => {
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  const [text, setText] = useState(TARGET_TEXT);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = () => {
    if (isScrambling) return; // Prevent starting if already scrambling
    setIsScrambling(true);
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        // Reset position if needed
        pos = 0; // Uncomment if you want to continue scrambling infinitely
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current);
    setText(TARGET_TEXT);
    setIsScrambling(false);
  };

  const handleClick = async () => {
    if (isScrambling) {
      stopScramble(); // Stop scrambling on button click
    } else {
      scramble(); // Start scrambling text
    }

    try {
      // Clear the token cookie using js-cookie
      Cookies.remove('token');

      // Clear user data from local storage
      localStorage.removeItem('user');

      // Redirect to the login page
      navigate("/");

    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);
  
  return (
    <motion.button
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      onTouchStart={scramble}  // For mobile devices
      onTouchEnd={stopScramble} // For mobile devices
      onClick={handleClick}
      className="group relative overflow-hidden rounded-lg border-[1px] border-neutral-500 bg-neutral-700 px-4 py-2 font-mono font-medium uppercase text-neutral-300 transition-colors hover:text-red-500"
    >
      <div className="relative z-10 flex items-center gap-2">
        <FiLock />
        <span>{text}</span>
      </div>
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
      />
    </motion.button>
  );
};

export default EncryptButton;  // Ensure this export is correct
