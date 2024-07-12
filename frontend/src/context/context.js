 "use client"

import { createContext, useState, useContext } from 'react';

// Create the context
export const DynamicContext = createContext();

// Create a provider component
export const DynamicProvider = ({ children }) => {
  const [dynamic, setDynamic] = useState(false); // Initial state is false

  return (
    <DynamicContext.Provider value={{ dynamic, setDynamic }}>
      {children}
    </DynamicContext.Provider>
  );
};

// Custom hook to use the DynamicContext
export const useDynamicContext = () => useContext(DynamicContext);
