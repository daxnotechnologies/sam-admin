import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [featuredApp, setFeaturedApp] = useState(false);

  const setFeature = (isfeatured) => {
    setFeaturedApp(isfeatured);
  };

  const exportValues = { featuredApp, setFeature };

  return (
    <StateContext.Provider value={exportValues}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
