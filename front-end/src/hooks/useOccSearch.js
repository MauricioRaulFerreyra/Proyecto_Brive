import { useState } from "react";
import axios from "axios";

const API_URL = "https://api.generadordni.es/v2/profiles/company";
const SPECIAL_CHARACTERS_REGEX = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

function useOccSearch() {
  const [companyName, setCompanyName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleSearch = async (value) => {
    if (value === "") {
      setErrorMessage("Debes ingresar el nombre de una empresa.");
      setSuccessMessage("");
      return;
    }

    if (SPECIAL_CHARACTERS_REGEX.test(value)) {
      setErrorMessage("No se puede realizar búsquedas con caracteres especiales.");
      setSuccessMessage("");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.get(API_URL);
      const { data: companyData } = response;

      const currentDate = new Date().toISOString().split("T")[0];
      const filteredData = companyData.map((company) => ({
        name: company.name,
        totalEmpleos: company.address_number,
        fechaBusqueda: currentDate,
      }));

      const filteredByName = filteredData.filter((company) =>
        company.name.toLowerCase().includes(value.toLowerCase())
      );

      if (filteredByName.length > 0) {
        setData(filteredByName);
        setSuccessMessage("Búsqueda exitosa");
      } else {
        setData([]);
        setSuccessMessage("No se encontraron resultados");
      }
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
      setErrorMessage("Error al realizar la búsqueda");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    companyName,
    setCompanyName,
    errorMessage,
    successMessage,
    loading,
    data,
    handleSearch,
  };
}

export default useOccSearch;
