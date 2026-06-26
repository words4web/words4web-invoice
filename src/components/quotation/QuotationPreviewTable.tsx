import { QuotationPreviewTableProps } from "@/types/quotation";

export function QuotationPreviewTable({
  items,
  totalLabel,
  totals,
}: QuotationPreviewTableProps) {
  return (
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
              textAlign: "left",
              fontWeight: "bold",
              fontStyle: "italic",
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
          <tr key={idx} style={{ pageBreakInside: "avoid" }}>
            <td
              style={{
                border: "1px solid #000",
                padding: "8px 10px",
                verticalAlign: "top",
              }}>
              <div style={{ fontWeight: "bold", marginBottom: "3px" }}>
                {idx + 1}) {item?.title}
              </div>
              <div
                style={{
                  fontSize: "9pt",
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.5",
                }}>
                {item?.description}
              </div>
            </td>
            <td
              style={{
                border: "1px solid #000",
                padding: "8px 10px",
                textAlign: "right",
                verticalAlign: "top",
                width: "110px",
              }}>
              {item?.amount
                ? `£${parseFloat(
                    item?.amount?.replace(/[^0-9.]/g, "") || "0",
                  )?.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`
                : ""}
            </td>
          </tr>
        ))}
        {/* TOTAL COST ROW */}
        <tr>
          <td
            style={{
              border: "1px solid #000",
              padding: "7px 10px",
              fontWeight: "bold",
              textAlign: "right",
            }}>
            TOTAL COST {totalLabel}
          </td>
          <td
            style={{
              border: "1px solid #000",
              padding: "7px 10px",
              textAlign: "right",
              width: "110px",
              fontWeight: "bold",
            }}>
            {totals?.total > 0
              ? `£${totals?.total?.toLocaleString("en-GB", {
                  minimumFractionDigits: 2,
                })}`
              : ""}
          </td>
        </tr>
        <tr>
          <td
            colSpan={2}
            style={{
              border: "1px solid #000",
              padding: "5px 10px",
              fontWeight: "bold",
              textAlign: "right",
              fontSize: "8.5pt",
            }}>
            N.B Quotation is subject to standard rate of VAT @ 20%
          </td>
        </tr>
      </tbody>
    </table>
  );
}
