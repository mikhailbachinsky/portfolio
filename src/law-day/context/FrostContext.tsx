import React, { createContext, useContext, useState, useEffect } from 'react';

interface FrostContextType {
  frostIntensity: number; // 0 to 100
  setFrostIntensity: (val: number) => void;
}

const FrostContext = createContext<FrostContextType>({
  frostIntensity: 75,
  setFrostIntensity: () => {},
});

export const FrostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [frostIntensity, setFrostIntensity] = useState<number>(75);

  // Sync with CSS custom property on document root so CSS shaders & overlays can react in real time
  useEffect(() => {
    const root = document.documentElement;
    const factor = frostIntensity / 100;
    root.style.setProperty('--frost-intensity', factor.toString());
    root.style.setProperty('--frost-blur', `${factor * 20}px`);
    root.style.setProperty('--frost-opacity', (0.15 + factor * 0.7).toFixed(3));
    root.style.setProperty('--frost-scale', (0.5 + factor * 1.5).toFixed(3));
  }, [frostIntensity]);

  return (
    <FrostContext.Provider value={{ frostIntensity, setFrostIntensity }}>
      {children}
    </FrostContext.Provider>
  );
};

export const useFrost = () => useContext(FrostContext);
