import { Input, Space, Alert, Card, Spin } from "antd";
import useOccSearch from "../hooks/useOccSearch";

const { Search } = Input;

function Occ() {
  const {
    companyName,
    setCompanyName,
    errorMessage,
    successMessage,
    loading,
    data,
    handleSearch
  } = useOccSearch();

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
      {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
      {successMessage && <p>{successMessage}</p>}
      <div className="card-container" style={{ minHeight: 550 }}>
        {loading ? (
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
              <Spin tip="Loading">
                <div className="content" />
              </Spin>
            </Space>
          </Space>
        ) : (
          <>
            {data.map((item, index) => (
              <Card
              key={index}
              title={item.nombre}
              bordered={false}
              style={{ width: 300 }}
              className="card-wrapper">
                <p>Total de empleos: {item.totalEmpleos}</p>
                <p>Fecha de búsqueda: {item.fechaBusqueda}</p>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Occ;
