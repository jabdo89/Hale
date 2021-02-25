import XLSX from "xlsx";
import moment from "moment";

const OrdersExcelFormatter = (data) => {
  let wb = XLSX.utils.book_new();
  let ws = XLSX.utils.aoa_to_sheet([[""]]);

  ws["!merges"] = [
    { s: { r: 1, c: 1 }, e: { r: 1, c: 8 } },
    { s: { r: 1, c: 9 }, e: { r: 1, c: 18 } },
  ];

  XLSX.utils.sheet_add_aoa(ws, [["Detalles de pedido"]], { origin: "B2" });
  XLSX.utils.sheet_add_aoa(ws, [["Detalles de envío"]], { origin: "J2" });

  let cell_address = { c: 1, r: 2 };
  let cell_ref = XLSX.utils.encode_cell(cell_address);

  let transformedData = data.map((obj) => ({
    "#ORDEN": "",
    "Order ID": obj.id ?? "",
    Fecha:
      moment(new Date(obj.date.seconds * 1000)).format("MMM Do YYYY") ?? "",
    Cliente: `${obj.firstName ?? ""} ${obj.lastname ?? ""}`,
    Producto1: obj.items[0].name ?? "",
    Piezas1: obj.items[0].quantity ?? "",
    "Precio individual 1": obj.items[0].price ?? "",
    Producto2: obj.items[1].name ?? "",
    Piezas2: obj.items[1].quantity ?? "",
    "Precio individual 2": obj.items[1].price ?? "",
    "Direccion (1)": obj.address.street ?? "",
    "Direccion (2)": obj.address.apartmentNum ?? "",
    Ciudad: obj.address.city ?? "",
    Estado: obj.address.state ?? "",
    "Codigo postal": obj.address.zipcode ?? "",
    Telefono: obj.phone ?? "",
    Correo: obj.email ?? "",
    "Tipo de pago": obj.paymentMethod ?? "",
    "Estatus de pago": obj.payed ?? "",
  }));

  XLSX.utils.sheet_add_json(ws, transformedData, { origin: cell_ref });

  XLSX.utils.book_append_sheet(wb, ws, "Órdenes");
  XLSX.writeFile(wb, "ordenes.xlsx");
};

export default OrdersExcelFormatter;
