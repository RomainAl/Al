import { useState, useEffect } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isPaysage: window.innerHeight/window.innerWidth > 0 ? false : true
  });

  useEffect(() => {
    const handleResize = () => {
      const isPaysage = window.innerHeight/window.innerWidth > 1 ? false : true;

      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isPaysage: isPaysage
      });
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;