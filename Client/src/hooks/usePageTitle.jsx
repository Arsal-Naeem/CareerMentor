import { useEffect } from "react";

const usePageTitle = (pageTitle = "") => {
  useEffect(() => {
    const fullTitle = `Tech Path AI${pageTitle ? " - " + pageTitle : ""}`;
    document.title = fullTitle;
  }, [pageTitle]);
};

export default usePageTitle;
