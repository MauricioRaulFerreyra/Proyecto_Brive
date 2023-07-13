import { useState } from "react";
import axios from "axios";

function useOccSearch() {
  const [companyName, setCompanyName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleSearch = () => {
    if (companyName === "") {
      setErrorMessage("Debes ingresar el nombre de una empresa.");
      setSuccessMessage("");
    } else {
      setLoading(true);
      // Simulación de la llamada a la API con datos de ejemplo
      setTimeout(() => {
        const exampleData = [
          { nombre: "Empresa 1", totalEmpleos: 10, fechaBusqueda: "2023-07-01" },
          { nombre: "Empresa 2", totalEmpleos: 5, fechaBusqueda: "2023-07-02" },
          { nombre: "Empresa 3", totalEmpleos: 15, fechaBusqueda: "2023-07-02" },
          { nombre: "Empresa 4", totalEmpleos: 1, fechaBusqueda: "2023-07-02" },
          { nombre: "Empresa 5", totalEmpleos: 3, fechaBusqueda: "2023-07-02" }
        ];
        setData(exampleData);
        setSuccessMessage("");
        setErrorMessage("");
        setLoading(false);
      }, 2000);
    }
  };

  return {
    companyName,
    setCompanyName,
    errorMessage,
    successMessage,
    loading,
    data,
    handleSearch
  };
}

export default useOccSearch;
