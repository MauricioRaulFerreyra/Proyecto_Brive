import { useState } from "react";

function useOccHistory() {
  const [searchHistory, setSearchHistory] = useState([]);

  const addToSearchHistory = (search) => {
    setSearchHistory((prevHistory) => [
      ...prevHistory,
      { ...search, Numero_Fila: prevHistory.length + 1 },
    ]);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  return {
    searchHistory,
    addToSearchHistory,
    clearSearchHistory,
  };
}

export default useOccHistory;
