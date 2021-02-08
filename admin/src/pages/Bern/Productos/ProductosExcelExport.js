import XLSX from "xlsx";

const ProductosExcelFormatter = (data) => {
  let wb = XLSX.utils.book_new();

  let transformedData = data.map((obj) => ({
    SKU: obj.sku ?? "",
    Name: obj.name ?? "",
    "Short Description": obj.shortDescription ?? "",
    New: obj.new ?? "",
  }));

  const ws = XLSX.utils.json_to_sheet(transformedData);

  XLSX.utils.book_append_sheet(wb, ws, "Productos");
  XLSX.writeFile(wb, "productos.xlsx");
};

export default ProductosExcelFormatter;
