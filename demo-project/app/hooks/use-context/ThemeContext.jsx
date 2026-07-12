'use client';
import { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext(null);

// STEP 2: Provider — holds the shared state
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook wrapping useContext — the recommended pattern
export function useTheme() {
  return useContext(ThemeContext);
}
