import React from "react";
import { Container, Row, Col } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import jsonxml from 'jsontoxml';


const Facturacion = (props) => {
  // const jsonFacturacion = {
  //   Complemento: null,
  //   Addenda: null,
  //   Version: "3.3",
  //   Serie: "RogueOne",
  //   Folio: "HNFK231",
  //   Fecha: "2021-02-01T10:44:54",
  //   Sello: "",
  //   FormaPago: "01",
  //   NoCertificado: "20001000000300022816",
  //   Certificado: "",
  //   CondicionesDePago: null,
  //   SubTotal: "200.00",
  //   Moneda: "MXN",
  //   TipoCambio: "1",
  //   Total: "200.00",
  //   TipoDeComprobante: "I",
  //   MetodoPago: "PUE",
  //   LugarExpedicion: "06300",
  //   CfdiRelacionados: null,
  //   Emisor: {
  //     Rfc: "XIA190128J61",
  //     Nombre: "MB IDEAS DIGITALES SC",
  //     RegimenFiscal: "601",
  //   },
  //   Receptor: {
  //     Rfc: "AAA010101AAA",
  //     Nombre: "SW SMARTERWEB",
  //     NumRegIdTrib: null,
  //     UsoCFDI: "G03",
  //   },
  //   Conceptos: [
  //     {
  //       Impuestos: {
  //         Traslados: [
  //           {
  //             Base: "200.00",
  //             Impuesto: "002",
  //             TipoFactor: "Tasa",
  //             TasaOCuota: "0.160000",
  //             Importe: "32.00",
  //           },
  //           {
  //             Base: "200.00",
  //             Impuesto: "002",
  //             TipoFactor: "Exento",
  //           },
  //         ],
  //         Retenciones: [
  //           {
  //             Base: "200.00",
  //             Impuesto: "002",
  //             TipoFactor: "Tasa",
  //             TasaOCuota: "0.060000",
  //             Importe: "12.00",
  //           },
  //           {
  //             Base: "200.00",
  //             Impuesto: "001",
  //             TipoFactor: "Tasa",
  //             TasaOCuota: "0.100000",
  //             Importe: "20.00",
  //           },
  //         ],
  //       },
  //       InformacionAduanera: null,
  //       CuentaPredial: null,
  //       ComplementoConcepto: null,
  //       Parte: null,
  //       ClaveProdServ: "50211503",
  //       NoIdentificacion: "UT421511",
  //       Cantidad: 1,
  //       ClaveUnidad: "H87",
  //       Unidad: "Pieza",
  //       Descripcion: "Cigarros",
  //       ValorUnitario: "200.00",
  //       Importe: "200.00",
  //     },
  //   ],
  //   Impuestos: {
  //     Retenciones: [
  //       {
  //         Impuesto: "002",
  //         Importe: "12.00",
  //       },
  //       {
  //         Impuesto: "001",
  //         Importe: "20.00",
  //       },
  //     ],
  //     Traslados: [
  //       {
  //         Impuesto: "002",
  //         TipoFactor: "Tasa",
  //         TasaOCuota: "0.160000",
  //         Importe: "32.00",
  //       },
  //     ],
  //     TotalImpuestosTrasladados: "32.00",
  //     TotalImpuestosRetenidos: "32.00",
  //   },
  // };

  // jsonxml(jsonFacturacion)
  
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Facturación" breadcrumbItem="Facturación" />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Facturacion;
