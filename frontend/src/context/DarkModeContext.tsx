import React, { useState } from 'react';

interface DarkModeContextType {
  isDark: boolean;
  toggleDark: () => void;
}

const DarkModeContext = React.createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('darkMode') === 'true');

  const toggleDark = () => {
    const newVal = !isDark;
    setIsDark(newVal);
    localStorage.setItem('darkMode', String(newVal));
    document.documentElement.classList.toggle('dark', newVal);
  };

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const ctx = React.useContext(DarkModeContext);
  if (!ctx) throw new Error('useDarkMode outside provider');
  return ctx;
};
