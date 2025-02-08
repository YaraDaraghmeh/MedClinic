import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useLoadingOnLocationChange = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true); // Set loading to true when location changes

    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after a delay (simulate loading)
    }, 1500); // Simulate a loading delay of 1.5 seconds

    return () => clearTimeout(timer); // Clean up the timeout on unmount
  }, [location]); // Dependency array, effect triggers on location change

  return loading;
};

export default useLoadingOnLocationChange;
