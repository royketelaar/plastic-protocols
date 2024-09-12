"use client";
import { createContext, useContext, useState, ReactNode, use } from 'react';

// Define the shape of the global state
interface GlobalState {
  isOpen: boolean;
  toggleMenu: () => void;
}

// Create the context with default values
const GlobalContext = createContext<GlobalState | undefined>(undefined);

// Create a provider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <GlobalContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the global context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
