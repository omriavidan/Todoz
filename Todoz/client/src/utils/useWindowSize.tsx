import React, { createContext, useContext } from "react";
import { useState, useEffect } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

interface WindowSizeContextProps {
  width: number;
  height: number;
}

const WindowSizeContext = createContext<WindowSizeContextProps | undefined>(
  undefined
);

export const WindowSizeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const windowSize = useWindowSize();

  return (
    <WindowSizeContext.Provider value={windowSize}>
      {children}
    </WindowSizeContext.Provider>
  );
};

export const useWindowSizeContext = () => {
  const context = useContext(WindowSizeContext);
  if (!context) {
    throw new Error(
      "useWindowSizeContext must be used within a WindowSizeProvider"
    );
  }
  return context;
};