import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

export const RoomPermission = ({ formData }) => {
  const formatDate = (date) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString("en-GB", options);
  };

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 14,
      flexDirection: "column",
    },
    Heading1: {
      fontSize: 22,
      fontFamily: "Times-Roman",
      textAlign: "center",
    },
    Heading2: {
      fontSize: 20,
      fontFamily: "Times-Bold",
      textAlign: "center",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCol: {
      width: "50%",
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: "#000",
      padding: 5,
    },
    tableCellMain: {
      fontSize: 14,
      fontFamily: "Times-Bold",
    },
    tableCell: {
      fontSize: 14,
      fontFamily: "Times-Roman",
    },
    lastCol: {
      borderRightWidth: 0,
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    note: {
      marginTop: 50,
      fontFamily: "Times-Italic",
      fontSize: 14,
    },
    signatureContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 50,
    },
    signature: {
      fontFamily: "Times-Bold",
      fontSize: 14,
    },
    signatureLeft: {
      textAlign: "left",
    },
    signatureRight: {
      textAlign: "right",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.Heading1}>
            Punjab Engineering College (Deemed to be University) Chandigarh
          </Text>
        </View>

        <View style={{ margin: 20 }}></View>

        <View style={styles.Heading2}>
          <Text>PERFORMA FOR BOOKING OF LECTURE ROOMS BY</Text>
          <Text>CLUBS/SOCIETIES/NSS/NCC/SPORTS</Text>
          <Text>& DEPARTMENTS</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellMain}>Name of Society:</Text>
              </View>
              <View style={[styles.tableCol, styles.lastCol]}>
                <Text style={styles.tableCell}>{formData.society}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellMain}>Event Name:</Text>
              </View>
              <View style={[styles.tableCol, styles.lastCol]}>
                <Text style={styles.tableCell}>{formData.eventName}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellMain}>Date:</Text>
              </View>
              <View style={[styles.tableCol, styles.lastCol]}>
                <Text style={styles.tableCell}>
                  {formatDate(formData.fromDate)} -{" "}
                  {formatDate(formData.toDate)}
                </Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellMain}>Time:</Text>
              </View>
              <View style={[styles.tableCol, styles.lastCol]}>
                <Text style={styles.tableCell}>{formData.time}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellMain}>Room Number:</Text>
              </View>
              <View style={[styles.tableCol, styles.lastCol]}>
                <Text style={styles.tableCell}>{formData.roomNumber}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellMain}>Department:</Text>
              </View>
              <View style={[styles.tableCol, styles.lastCol]}>
                <Text style={styles.tableCell}>{formData.department}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.lastRow]}>
              <View style={[styles.tableCol, styles.lastRow]}>
                <Text style={styles.tableCellMain}>
                  Brief Event Description:
                </Text>
              </View>
              <View style={[styles.tableCol, styles.lastCol, styles.lastRow]}>
                <Text style={styles.tableCell}>
                  {formData.eventDescription}
                </Text>
              </View>
            </View>
          </View>

          {/* Note Section */}
          <View style={styles.note}>
            <Text>
              Note: The undersigned takes full responsibility for any damage to
              the institute’s property in the above-mentioned rooms during the
              specified time.
            </Text>
          </View>

          <View style={styles.signatureContainer}>
            <Text style={[styles.signature, styles.signatureLeft]}>
              (Secretary/J. Secretary)
            </Text>
            <Text style={[styles.signature, styles.signatureRight]}>
              (CCS/CSTS)
            </Text>
          </View>

          <View style={styles.signatureContainer}>
            <Text style={[styles.signature, styles.signatureLeft]}>
              (Officer Incharge)
            </Text>
            <Text style={[styles.signature, styles.signatureRight]}>
              (ADSA)
            </Text>
          </View>

          <View style={styles.signatureContainer}>
            <Text style={[styles.signature, styles.signatureLeft]}>
              (PI Security)
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
