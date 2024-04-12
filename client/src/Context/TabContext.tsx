import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type SidebarContextType = {
  activeButton: string;
  setActiveButton: React.Dispatch<React.SetStateAction<string>>;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
};

type SidebarProviderProps = {
  children: ReactNode;
};

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [activeButton, setActiveButton] = useState<string>(() => {
    const storedActiveButton = localStorage.getItem('activeButton');
    return storedActiveButton ? storedActiveButton : 'Employees';
  });

  useEffect(() => {
    localStorage.setItem('activeButton', activeButton);
  }, [activeButton]);

  return (
    <SidebarContext.Provider value={{ activeButton, setActiveButton }}>
      {children}
    </SidebarContext.Provider>
  );
};
