import { useState, useEffect } from "react";

export const useCountUp = (total, duration) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const intervalTime = Math.max(duration / total, 20);
    if (total <= 0) return;
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount >= total) {
          clearInterval(interval);
          return total;
        }
        return prevCount + 1;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [total, duration]);

  return count;
};
