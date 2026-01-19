import { useState, useEffect, useRef } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  delay?: number; // Add delay prop
}

export default function TypingText({ text, speed = 40, className, delay = 0, onComplete }: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    // Only run once - prevent re-triggering
    if (completedRef.current) return;

    const startTyping = () => {
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
      return () => clearInterval(interval); // Cleanup for interval
    };

    let timeoutId: NodeJS.Timeout;
    let intervalCleanup: (() => void) | undefined;

    if (delay > 0) {
      timeoutId = setTimeout(() => {
        intervalCleanup = startTyping();
      }, delay);
    } else {
      intervalCleanup = startTyping();
    }

    return () => {
      clearTimeout(timeoutId); // Cleanup for timeout
      if (intervalCleanup) {
        intervalCleanup(); // Cleanup for interval if it was started
      }
    };
  }, [text, speed, delay, onComplete]); // Re-run if these change (though usually static)

  return (
    <p className={`text-md md:text-xl text-muted-foreground mb-6 leading-relaxed whitespace-pre-line ${className || ""}`}>
      {displayed}
      {!isComplete && <span className="animate-pulse">|</span>}
    </p>
  );
}
