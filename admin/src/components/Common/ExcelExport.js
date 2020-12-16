import React from "react";
import { Button } from "reactstrap";
import XLSX from "xlsx";

const ExcelExport = ({ data = [] }) => {
  const fileExport = () => {
    console.log("Exporting data", data);

    let worksheet = XLSX.utils.json_to_sheet(data);
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet);
    XLSX.writeFile(workbook, "datos.xlsx");
  };

  return (
    <Button
      type="button"
      color="success"
      className="btn-rounded waves-effect waves-light mb-2 mr-2"
      onClick={fileExport}
    >
      Exportar a Excel
    </Button>
  );
};

export default ExcelExport;
