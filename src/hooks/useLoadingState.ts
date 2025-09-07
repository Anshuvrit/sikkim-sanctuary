import { useState } from "react";

export const useLoadingState = (duration: number = 2000) => {
  const [loading, setLoading] = useState(false);

  const startLoading = async (): Promise<void> => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve();
      }, duration);
    });
  };

  return { loading, startLoading };
};

export default useLoadingState;