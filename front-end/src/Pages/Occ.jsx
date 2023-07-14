import { useState } from "react";
import axios from "axios";
import { Input, Space, Alert } from 'antd';

const { Search } = Input;

function Occ() {
  const [companyName, setCompanyName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (companyName === "") {
      setErrorMessage("Debes ingresar el nombre de una empresa.");
      setSuccessMessage("");
    } else {
      setLoading(true);
      axios
        .get(`https://api.occ.com.mx/empresas/${companyName}`)
        .then((response) => {
          const { nombre, totalEmpleos, fechaBusqueda } = response.data;
          setSuccessMessage(
            `Empresa: ${nombre}, Total de empleos: ${totalEmpleos}, Fecha de búsqueda: ${fechaBusqueda}`
          );
          setErrorMessage("");
          setLoading(false);
        })
        .catch((error) => {
          setErrorMessage("Error al realizar la búsqueda de la empresa.");
          setSuccessMessage("");
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <h1>Búsqueda de empresas</h1>
      <Search
        placeholder="Nombre de la empresa"
        onSearch={handleSearch}
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        enterButton
      />
      {errorMessage && <Alert message = {errorMessage} type="error" showIcon />}
      {successMessage && <p>{successMessage}</p>}
      <div style={{minHeight: 550}}>
        {
          loading
          ?
          <>cargando</>
          :
          <>Aqui voy a poner las cartas cuando me pasen la info</>
        }
      </div>
    </div>
  );
}

export default Occ;
