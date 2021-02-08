import XLSX from "xlsx";

const ClientsExcelFormatter = (data) => {
  let wb = XLSX.utils.book_new();

  let transformedData = data.map((obj) => ({
    "Name": `${obj.firstName ?? ""} ${obj.lastName ?? ""}`,
    "Product 1": `${obj.productoUno}` ?? "",
    "Product 2": `${obj.productoDos}` ?? "",
    "Total Spent": obj.totalSpent ?? "",
  }));

  const ws = XLSX.utils.json_to_sheet(transformedData);

  XLSX.utils.book_append_sheet(wb, ws, "Clientes");
  XLSX.writeFile(wb, "clientes.xlsx");
};

export default ClientsExcelFormatter;
