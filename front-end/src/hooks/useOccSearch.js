import { useState } from "react";
import axios from "axios";

//const API_URL = "https://api.generadordni.es/v2/profiles/company";
const API_URL = "https://localhost:7146/WebScrapping/guardar";
const SPECIAL_CHARACTERS_REGEX = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

function useOccSearch() {
  const [companyName, setCompanyName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const arrayData = [];
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
      const response = await axios.post(API_URL, {
        nombre: value,
      });

      let companyData = response.data;

      companyData.Nombre = value;

      if (companyData.Nombre.length > 0) {
        arrayData.push(companyData);
        setData(arrayData);
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
