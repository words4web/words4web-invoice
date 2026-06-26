import { QuotationPreviewTableProps } from "@/types/quotation";

export function QuotationPreviewTable({ items }: QuotationPreviewTableProps) {
  const filteredItems =
    items?.filter((i) => i.description || i.qty || i.rate) || [];

  const formatVal = (val: number) =>
    val % 1 === 0
      ? val.toLocaleString("en-IN", { maximumFractionDigits: 0 })
      : val.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "9pt",
        marginBottom: "40px",
      }}>
      <thead>
        <tr style={{ background: "#8C52FF" }}>
          <th
            style={{
              border: "1px solid #000",
              padding: "6px 6px",
              textAlign: "left",
              fontWeight: "bold",
              color: "#fff",
            }}>
            ITEMS
          </th>
          <th
            style={{
              border: "1px solid #000",
              padding: "6px 4px",
              textAlign: "center",
              fontWeight: "bold",
              color: "#fff",
              width: "55px",
            }}>
            GST
          </th>
          <th
            style={{
              border: "1px solid #000",
              padding: "6px 4px",
              textAlign: "center",
              fontWeight: "bold",
              color: "#fff",
              width: "35px",
            }}>
            QTY
          </th>
          <th
            style={{
              border: "1px solid #000",
              padding: "6px 6px",
              textAlign: "right",
              fontWeight: "bold",
              color: "#fff",
              width: "80px",
            }}>
            RATE
          </th>
          <th
            style={{
              border: "1px solid #000",
              padding: "6px 6px",
              textAlign: "right",
              fontWeight: "bold",
              color: "#fff",
              width: "80px",
            }}>
            AMOUNT
          </th>
          <th
            style={{
              border: "1px solid #000",
              padding: "6px 6px",
              textAlign: "right",
              fontWeight: "bold",
              color: "#fff",
              width: "80px",
            }}>
            IGST
          </th>
          <th
            style={{
              border: "1px solid #000",
              padding: "6px 6px",
              textAlign: "right",
              fontWeight: "bold",
              color: "#fff",
              width: "90px",
            }}>
            TOTAL
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredItems.map((item, idx) => {
          const qty = parseFloat(item.qty) || 0;
          const rate = parseFloat(item.rate) || 0;
          const gstRate = parseFloat(item.gstRate) || 0;
          const amount = qty * rate;
          const igst = amount * (gstRate / 100);
          const total = amount + igst;

          return (
            <tr key={idx}>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "6px 6px",
                  verticalAlign: "middle",
                  whiteSpace: "pre-wrap",
                  textAlign: "left",
                  color: "#111",
                  fontWeight: "normal",
                }}>
                {item.description}
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "6px 4px",
                  textAlign: "center",
                  verticalAlign: "middle",
                  color: "#111",
                  fontWeight: "normal",
                }}>
                {item.gstRate}%
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "6px 4px",
                  textAlign: "center",
                  verticalAlign: "middle",
                  color: "#111",
                  fontWeight: "normal",
                }}>
                {item.qty}
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "6px 6px",
                  textAlign: "right",
                  verticalAlign: "middle",
                  whiteSpace: "nowrap",
                  color: "#111",
                  fontWeight: "normal",
                }}>
                ₹{formatVal(rate)}
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "6px 6px",
                  textAlign: "right",
                  verticalAlign: "middle",
                  whiteSpace: "nowrap",
                  color: "#111",
                  fontWeight: "normal",
                }}>
                ₹{formatVal(amount)}
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "6px 6px",
                  textAlign: "right",
                  verticalAlign: "middle",
                  whiteSpace: "nowrap",
                  color: "#111",
                  fontWeight: "normal",
                }}>
                ₹{formatVal(igst)}
              </td>
              <td
                style={{
                  border: "1px solid #000",
                  padding: "6px 6px",
                  textAlign: "right",
                  verticalAlign: "middle",
                  whiteSpace: "nowrap",
                  color: "#111",
                  fontWeight: "normal",
                }}>
                ₹{formatVal(total)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
