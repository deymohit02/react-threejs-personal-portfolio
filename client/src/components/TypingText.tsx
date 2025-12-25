import { useState, useEffect, useRef } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export default function TypingText({ text, speed = 40, onComplete }: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    // Only run once - prevent re-triggering
    if (completedRef.current) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;

      if (i > text.length) {
        clearInterval(interval);
        setIsComplete(true);
        completedRef.current = true;
        
        // Call the completion callback when typing is done
        if (onComplete) {
          onComplete();
        }
      }
    }, speed);

    return () => clearInterval(interval);
  }, []); // Empty dependency array - run only once on mount

  return (
    <p className="text-md md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed whitespace-pre-line">
      {displayed}
      {!isComplete && <span className="animate-pulse">|</span>}
    </p>
  );
}
