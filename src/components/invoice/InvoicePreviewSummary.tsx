import { InvoicePreviewProps } from "@/types/invoice";
import { calcInvoiceTotals } from "@/utils/invoice";
import { COMPANY } from "@/data/company";

export function InvoicePreviewSummary({ data }: InvoicePreviewProps) {
  const totals = calcInvoiceTotals(data.items);

  return (
    <div style={{ marginTop: "16px", fontSize: "9pt" }}>
      {/* SUMMARY SECTION */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
        }}>
        {/* Bank Details */}
        <div style={{ width: "38%" }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "9pt",
              color: "#111",
              marginBottom: "6px",
              textTransform: "uppercase",
            }}>
            Bank Details
          </div>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "8.5pt",
            }}>
            <tbody>
              <tr>
                <td
                  style={{
                    padding: "3px 0",
                    fontWeight: "bold",
                    color: "#555",
                    width: "100px",
                  }}>
                  Account Name
                </td>
                <td style={{ padding: "3px 0", color: "#000" }}>
                  {data.accountName || COMPANY.accountName}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "3px 0",
                    fontWeight: "bold",
                    color: "#555",
                  }}>
                  Account Number
                </td>
                <td style={{ padding: "3px 0", color: "#000" }}>
                  {data.accountNo || COMPANY.accountNo}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "3px 0",
                    fontWeight: "bold",
                    color: "#555",
                  }}>
                  IFSC
                </td>
                <td style={{ padding: "3px 0", color: "#000" }}>
                  {data.ifsc || COMPANY.ifsc}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "3px 0",
                    fontWeight: "bold",
                    color: "#555",
                  }}>
                  Account Type
                </td>
                <td style={{ padding: "3px 0", color: "#000" }}>
                  {data.accountType || COMPANY.accountType}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "3px 0",
                    fontWeight: "bold",
                    color: "#555",
                  }}>
                  Bank
                </td>
                <td style={{ padding: "3px 0", color: "#000" }}>
                  {data.bank || COMPANY.bank}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* UPI Scan */}
        <div
          style={{
            width: "30%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "8.5pt",
              color: "#111",
              marginBottom: "2px",
              textTransform: "uppercase",
            }}>
            Scan to pay via UPI
          </div>
          <div
            style={{
              fontSize: "6.5pt",
              color: "#666",
              lineHeight: "1.25",
              marginBottom: "4px",
              maxWidth: "150px",
              textAlign: "center",
            }}>
            Maximum of 1 lakh canbe transferred via upi in a single day
          </div>
          <div
            style={{
              width: "85px",
              height: "85px",
              border: "1px solid #ccc",
              background: "#fff",
              padding: "4px",
              margin: "4px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            {data.qrCode ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.qrCode}
                alt="UPI QR Code"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : (
              <span
                style={{
                  fontSize: "7.5pt",
                  color: "#999",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}>
                Missing
              </span>
            )}
          </div>
          <div style={{ fontWeight: "bold", fontSize: "8pt", color: "#000" }}>
            {data.upiId || COMPANY.upiId}
          </div>
        </div>

        {/* Totals */}
        <div
          style={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td
                  style={{
                    padding: "4px 0",
                    fontWeight: "bold",
                    textAlign: "left",
                    color: "#555",
                    fontSize: "8.5pt",
                  }}>
                  SUBTOTAL
                </td>
                <td
                  style={{
                    padding: "4px 0",
                    textAlign: "right",
                    width: "110px",
                    fontWeight: "bold",
                    color: "#111",
                    fontSize: "8.5pt",
                  }}>
                  {totals.fmtSubtotal}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "4px 0",
                    fontWeight: "bold",
                    textAlign: "left",
                    color: "#555",
                    fontSize: "8.5pt",
                  }}>
                  TAX
                </td>
                <td
                  style={{
                    padding: "4px 0",
                    textAlign: "right",
                    width: "110px",
                    fontWeight: "bold",
                    color: "#111",
                    fontSize: "8.5pt",
                  }}>
                  ₹ {totals.fmtVat}
                </td>
              </tr>
              <tr style={{ color: "#111" }}>
                <td
                  style={{
                    padding: "6px 0",
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: "10pt",
                    borderTop: "1px solid #111",
                  }}>
                  TOTAL
                </td>
                <td
                  style={{
                    padding: "6px 0",
                    textAlign: "right",
                    width: "110px",
                    fontWeight: "bold",
                    fontSize: "10pt",
                    borderTop: "1px solid #111",
                  }}>
                  {totals.fmtTotal}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SIGNATORY */}
      <div
        style={{
          textAlign: "right",
          marginTop: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}>
        <div style={{ height: "40px" }} />
        <div
          style={{
            fontSize: "8pt",
            color: "#333",
            borderTop: "1px solid #333",
            paddingTop: "4px",
            width: "180px",
            textAlign: "center",
          }}>
          Authorised Signatory
        </div>
      </div>
    </div>
  );
}
