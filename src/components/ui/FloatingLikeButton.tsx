"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface FloatingLikeButtonProps {
  onLike: () => void;
  isLiked: boolean;
  likeCount: number;
}

export default function FloatingLikeButton({
  onLike,
  isLiked,
  likeCount,
}: FloatingLikeButtonProps) {
  const [justLiked, setJustLiked] = useState(false);

  const handleClick = () => {
    onLike();
    setJustLiked(true);
    setTimeout(() => setJustLiked(false), 600);
  };

  return (
    <div className="sticky top-36 h-fit hidden lg:block">
      <motion.button
        onClick={handleClick}
        className={`cursor-pointer relative flex flex-col items-center justify-center w-16 h-16 rounded-full shadow-lg transition-all duration-300 ${
          isLiked
            ? "bg-tedx-red text-white"
            : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isLiked ? "Unlike this post" : "Like this post"}
      >
        <motion.div
          animate={{
            scale: justLiked ? [1, 1.5, 1] : 1,
            rotate: justLiked ? [0, -10, 10, -10, 0] : 0,
          }}
          transition={{ duration: 0.6 }}
        >
          <Heart
            className={`w-8 h-8 ${isLiked ? "fill-current" : ""}`}
            strokeWidth={isLiked ? 0 : 2.5}
            fill={isLiked ? "currentColor" : "none"}
          />
        </motion.div>
        {likeCount > 0 && (
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-8 text-xs font-semibold text-gray-700 whitespace-nowrap"
          >
            {likeCount}
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}

