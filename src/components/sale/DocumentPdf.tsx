import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

import logo from "../../assets/img/logo.png";
import footer from "../../assets/img/footer.png";
import { OrderDetail, Sale } from "../../models/models";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
// Definir estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    margin: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingRight: 40,
  },
  headerLeft: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerText: {
    fontSize: 12,
  },
  headerTextTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 50,
    height: 50,
  },
  imageLogo: {
    width: 130,
    height: "auto",
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    paddingLeft: 29,
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderRightWidth: 0,
    borderBottomWidth: 0,
    paddingRight: 40,
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableColHeader: {
    width: "15%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    fontSize: 13,
  },
  tableColHeaderRight: {
    borderRightWidth: 1,
  },
  tableCol: {
    width: "15%",
    height: "auto",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    alignItems: "center",
    padding: 4,
    justifyContent: "center",
    fontSize: 12,
  },
  tableColRigth: {
    borderRightWidth: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 40,
    left: 10,
    right: 10,
  },
  headerRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  footerText: {
    fontSize: 11,
    marginBottom: 5,
  },
  footerImage: {
    width: 520,
    height: "auto",
  },
  bold: {
    fontSize: 13,
    fontWeight: 800,
  },
  marginXY: {
    marginTop: 7,
    marginBottom: 10,
  },
  colHeaderTotal:{
    width: "10%"
  },
  colHeaderQuanti:{
    width: "7%",
  },
  colHeaderDesc:{
    width: "43%",
  },
  colHeaderItem:{
    width: "7%",
  },
  colHeaderPU:{
    width: "10%",
  },
  colHeaderImg:{
    width: "13%",
  }

});

interface Props {
  companyName: string;
  city: string;
  country: string;  
  orderDetails: OrderDetail[];
  saleToShow: Sale | null;
}
// Componente PDF

const dateCurrently = new Date();
const DocumentPdf = ({
  companyName = "Servicios de Electrotecnia",
  city = "Cochabamba",
  country = "Bolivia",
  orderDetails,
  saleToShow
}: Props) => {
  const numberOfItem = 7;
  const pageNumbers = Math.floor(orderDetails?.length / numberOfItem);
  const newOrderDetails = [];
  let i = 0;
  for (i = 0; i < pageNumbers; i++) {
    newOrderDetails.push({
      page: i,
      orderDetails: orderDetails.slice(i * numberOfItem, (i + 1) * numberOfItem),
      greeting: i === 0 ? true : false,
    });
  }
  newOrderDetails.push({
    page: i,
    orderDetails: [...orderDetails.slice(i * numberOfItem, orderDetails.length), {
      name: "Total",
      quantity: 0,
      sale_price: 0,
      total: saleToShow?.total || 0,
      url_image: '',
    } ],
  });
  if(pageNumbers === 0){
    newOrderDetails[0].greeting = true;
  }

  const getMonth = () => {
    const months: Record<number, string> = {
      0: "Enero",
      1: "Febrero",
      2: "Marzo",
      3: "Abril",
      4: "Mayo",
      5: "Junio",
      6: "Julio",
      7: "Agosto",
      8: "Septiembre",
      9: "Octubre",
      10: "Noviembre",
      11: "Diciembre",
    };
    return months[dateCurrently.getMonth()];
  };
  return (
    <Document>
      {newOrderDetails?.map((item, indexMain) => (
        <Page size="A4" style={styles.page} key={item.page}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View>
                <Text style={styles.headerTextTitle}>{companyName}</Text>
              </View>
              <View>
                <Text style={styles.headerText}>
                  Servicio eléctrico y electrónica en Gral.{" "}
                </Text>
              </View>
              <Text style={styles.headerText}>{`${city}, ${country}`}</Text>
              <View></View>
            </View>
            <View style={styles.headerRight}>
              <Image style={styles.imageLogo} src={logo} />
              <Text style={styles.headerText}>
                {city +
                  ", " +
                  new Date().getDate() + ' ' +
                  getMonth() +
                  " de " +
                  new Date().getFullYear()}
              </Text>
            </View>
          </View>

          {item.greeting && (
            <View>
              <Text style={[styles.footerText]}>Señor</Text>
              <Text style={[styles.footerText, styles.bold]}>{saleToShow?.customer_name }</Text>
              <Text style={[styles.footerText]}>Presente.-</Text>
              <Text style={[styles.footerText, styles.marginXY]}>Estimados Señores</Text>
              <Text style={[styles.footerText]}>Se presenta a continuación el detalle de la cotización </Text>
            </View>
          )}

          <Text style={styles.title}>Detalle de Orden</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={[styles.tableColHeader, styles.colHeaderItem]}>
                <Text>Item</Text>
              </View>
              <View style={[styles.tableColHeader, styles.colHeaderDesc]}>
                <Text>Descripción</Text>
              </View>
              <View style={[styles.tableColHeader, styles.colHeaderQuanti]}>
                <Text>Cant.</Text>
              </View>
              <View style={[styles.tableColHeader, styles.colHeaderPU]}>
                <Text>P/U Bs</Text>
              </View>
              <View style={[styles.tableColHeader, styles.colHeaderImg]}>
                <Text>Imagen</Text>
              </View>
              <View style={[styles.tableColHeader, styles.tableColHeaderRight, styles.colHeaderTotal]}>
                <Text>Total</Text>
              </View>
            </View>

            {item.orderDetails?.map((detail: OrderDetail, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={[styles.tableCol, styles.colHeaderItem]}>
                  <Text>{indexMain * numberOfItem + index + 1}</Text>
                </View>
                <View style={[styles.tableCol, styles.colHeaderDesc]}>
                  <Text>{detail.name}</Text>
                </View>
                <View style={[styles.tableCol, styles.colHeaderQuanti]}>
                  <Text>{detail.quantity}</Text>
                </View>
                <View style={[styles.tableCol, styles.colHeaderPU]}>
                  <Text>{detail.sale_price}</Text>
                </View>
                <View style={[styles.tableCol, styles.colHeaderImg]}>
                  <Image
                    style={styles.image}
                    src={APIURLIMG + detail.url_image}
                  />
                </View>
                <View style={[styles.tableCol, styles.colHeaderTotal, styles.tableColHeaderRight]}>
                  <Text>{detail.total}</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.footer}>
            <View>
              {/* <Text>Servicios de Electrotecnia:</Text>
          {services.map((service, index) => (
            <Text style={styles.footerText} key={index}>{service}</Text>
          ))} */}
              <Image src={footer} style={styles.footerImage} />
            </View>
          </View>
        </Page>
      ))}

      {/* Footer */}
    </Document>
  );
};

export default DocumentPdf;
