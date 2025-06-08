import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [assessmentBreadcrumbText, setAssessmentBreadcrumbText] =
    useState("Career Assessment");
  // sidebar menu
  const [open, setOpen] = useState(false);

  const setBreadcrumbSuffix = (suffix = "") => {
    const base = "Career Assessment";
    setAssessmentBreadcrumbText(suffix ? `${base} / ${suffix}` : base);
  };

  return (
    <GlobalContext.Provider
      value={{
        assessmentBreadcrumbText,
        setBreadcrumbSuffix,
        open,
        setOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
