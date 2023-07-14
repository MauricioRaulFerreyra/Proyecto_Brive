import { Input, Space, Alert, Card, Spin, Table, Empty } from "antd";
import useOccSearch from "../hooks/useOccSearch";
import useOccHistory from "../hooks/useOccHistory";

const { Search } = Input;

function Occ() {
  const {
    companyName,
    setCompanyName,
    errorMessage,
    successMessage,
    loading,
    data,
    handleSearch,
  } = useOccSearch();

  const { searchHistory, addToSearchHistory } = useOccHistory();

  const historyColumns = [
    {
      title: "Numero_Fila",
      dataIndex: "Numero_Fila",
      key: "Numero_Fila",
      sorter: (a, b) => a.Numero_Fila - b.Numero_Fila,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Nombre_Empresa",
      dataIndex: "Nombre_Empresa",
      key: "Nombre_Empresa",
      sorter: (a, b) => a.Nombre_Empresa.localeCompare(b.Nombre_Empresa),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Total_Empleos",
      dataIndex: "Total_Empleos",
      key: "Total_Empleos",
      sorter: (a, b) => a.Total_Empleos - b.Total_Empleos,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Fecha_Busqueda",
      dataIndex: "Fecha_Busqueda",
      key: "Fecha_Busqueda",
      sorter: (a, b) => a.Fecha_Busqueda.localeCompare(b.Fecha_Busqueda),
      sortDirections: ["ascend", "descend"],
    },
  ];

  const handleSearchAndUpdateHistory = async (value) => {
    handleSearch(value);
    addToSearchHistory({
      Numero_Fila: searchHistory.length + 1,
      Nombre_Empresa: value,
      Total_Empleos: data.length > 0 ? data[0].totalEmpleos : 0,
      Fecha_Busqueda: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div>
      <h1>Búsqueda de empresas</h1>
      <Search
        placeholder="Nombre de la empresa"
        onSearch={handleSearchAndUpdateHistory}
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        enterButton
      />
      {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
      {successMessage && <p>{successMessage}</p>}
      <div className="card-container" style={{ minHeight: 550 }}>
        {loading ? (
          // <Space direction="vertical" style={{ width: "100%" }}>
          //   <Space>
          //     <Spin tip="Loading">
          //       <div className="content" />
          //     </Spin>
          //   </Space>
          // </Space>
          <div className="spin-container">
            <div className="spin-container-center">
              <div className="lds-facebook"><div></div><div></div><div></div></div>
            </div>
          </div>
        ) : (
          <>
            {data.map((item, index) => (
              <Card
                key={index}
                title={item.name}
                bordered={false}
                style={{ width: 300 }}
                className="card-wrapper"
              >
                <p>Total de empleos: {item.totalEmpleos}</p>
                <p>Fecha de búsqueda: {item.fechaBusqueda}</p>
              </Card>
            ))}
          </>
        )}
      </div>
      <h2>Historial de búsquedas</h2>
      {searchHistory.length > 0 ? (
        <>
          <Table
            dataSource={searchHistory}
            columns={historyColumns}
            pagination={false}
            className="history-table"
            rowKey="Numero_Fila"
          />
        </>
      ) : (
        <Empty className="no-result" description="No hay información de historial disponible." />
      )}
    </div>
  );
}

export default Occ;
