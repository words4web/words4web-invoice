import { InvoicePreviewTableProps } from "@/types/invoice";
import { calcInvoiceTotals } from "@/utils/invoice";

export function InvoicePreviewTable({ items }: InvoicePreviewTableProps) {
  const totals = calcInvoiceTotals(items);

  return (
    <>
      {/* ITEMS TABLE */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "9.5pt",
        }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #000",
                padding: "7px 10px",
                textAlign: "center",
              }}>
              DESCRIPTION
            </th>
            <th
              style={{
                border: "1px solid #000",
                padding: "7px 10px",
                width: "110px",
                textAlign: "center",
              }}>
              AMOUNT
            </th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item, idx) => (
            <tr key={idx} style={{ minHeight: "24px" }}>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "6px 10px",
                  verticalAlign: "top",
                  whiteSpace: "pre-wrap",
                }}>
                {item?.description}
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "6px 10px",
                  textAlign: "right",
                  width: "110px",
                  whiteSpace: "nowrap",
                }}>
                {item?.amount
                  ? `£${parseFloat(item?.amount?.replace(/[^0-9.]/g, "") || "0")?.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`
                  : ""}
              </td>
            </tr>
          ))}
          {Array.from({ length: Math.max(0, 8 - items?.length) })?.map(
            (_, i) => (
              <tr key={`blank-${i}`} style={{ height: "26px" }}>
                <td style={{ border: "1px solid #000" }}></td>
                <td style={{ border: "1px solid #000" }}></td>
              </tr>
            ),
          )}
          <tr>
            <td
              style={{
                border: "1px solid #000",
                padding: "6px 10px",
                textAlign: "right",
                fontSize: "9pt",
              }}>
              VAT @ 20%
            </td>
            <td
              style={{
                border: "1px solid #000",
                padding: "6px 10px",
                textAlign: "right",
                width: "110px",
              }}>
              {totals?.fmtVat}
            </td>
          </tr>
        </tbody>
      </table>

      {/* AMOUNT PAYABLE */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "9.5pt",
        }}>
        <tbody>
          <tr>
            <td
              style={{
                border: "1px solid #000",
                borderTop: "none",
                padding: "7px 10px",
                fontWeight: "bold",
                textAlign: "right",
              }}>
              AMOUNT PAYABLE
            </td>
            <td
              style={{
                border: "2px solid #000",
                borderTop: "none",
                padding: "7px 10px",
                textAlign: "right",
                width: "110px",
                fontWeight: "bold",
              }}>
              {totals?.fmtTotal}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
