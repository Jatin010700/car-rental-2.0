import { useState, useEffect } from "react";

const useCurrentYear = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const updateYear = () => {
      setCurrentYear(new Date().getFullYear());
    };

    updateYear();

    const intervalId = setInterval(updateYear, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return currentYear;
};

export default useCurrentYear;
