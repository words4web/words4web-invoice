import { InvoicePreviewProps } from "@/types/invoice";
import { COMPANY } from "@/data/company";

export function InvoicePreviewHeader({ data }: InvoicePreviewProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "10px",
      }}>
      <div style={{ textAlign: "left" }}>
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "24pt",
            fontWeight: 700,
            color: "#7A0000",
            marginBottom: "0px",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}>
          INVOICE
        </div>
        <table
          style={{
            fontSize: "9.5pt",
            borderCollapse: "collapse",
          }}>
          <tbody>
            <tr>
              <td
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  padding: "0 0",
                  lineHeight: "1.5",
                  textAlign: "left",
                  color: "#555",
                  width: "100px",
                }}>
                Invoice No
              </td>
              <td
                style={{
                  fontFamily: "monospace",
                  fontWeight: 300,
                  padding: "1px 6px",
                  width: "140px",
                  color: "#000",
                }}>
                {data?.invoiceNo || "—"}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  padding: "0 0",
                  lineHeight: "1.5",
                  textAlign: "left",
                  color: "#555",
                }}>
                Invoice Date
              </td>
              <td
                style={{
                  fontFamily: "monospace",
                  fontWeight: 300,
                  padding: "1px 6px",
                  color: "#000",
                }}>
                {data?.date || "—"}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  padding: "0 0",
                  lineHeight: "1.5",
                  textAlign: "left",
                  color: "#555",
                }}>
                Due Date
              </td>
              <td
                style={{
                  fontFamily: "monospace",
                  fontWeight: 300,
                  padding: "1px 6px",
                  color: "#000",
                }}>
                {data?.dueDate || "—"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt={COMPANY.name}
          style={{ height: "120px", width: "auto", display: "block" }}
        />
      </div>
    </div>
  );
}
