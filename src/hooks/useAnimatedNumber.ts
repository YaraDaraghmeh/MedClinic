import { useEffect, useState } from "react";

export const useAnimatedNumber = (target: number) => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (count < target) {
        count += 1;
        setNumber(count);
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [target]);

  return number;
};