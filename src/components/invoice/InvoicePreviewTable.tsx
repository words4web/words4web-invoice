import { InvoicePreviewTableProps } from "@/types/invoice";

export function InvoicePreviewTable({
  items,
  currency = "INR",
}: InvoicePreviewTableProps) {
  const filteredItems =
    items?.filter((i) => i.description || i.qty || i.rate) || [];

  const isVat = currency !== "INR";
  const taxHeader1 = isVat ? "VAT %" : "GST";
  const taxHeader2 = isVat ? "VAT" : "IGST";

  const currencySymbols = {
    INR: "₹",
    EUR: "€",
    GBP: "£",
  };
  const currencyLocales = {
    INR: "en-IN",
    EUR: "en-IE",
    GBP: "en-GB",
  };

  const symbol = currencySymbols[currency] || "₹";
  const locale = currencyLocales[currency] || "en-IN";

  const formatVal = (val: number) =>
    val % 1 === 0
      ? val.toLocaleString(locale, { maximumFractionDigits: 0 })
      : val.toLocaleString(locale, {
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
        <tr style={{ background: "#7A0000" }}>
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
            {taxHeader1}
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
            {taxHeader2}
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
          let rate = parseFloat(item.rate) || 0;
          if (item.isNegative) {
            rate = -Math.abs(rate);
          }
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
                {symbol}
                {formatVal(Math.abs(rate))}
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
                {symbol}
                {formatVal(Math.abs(amount))}
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
                {symbol}
                {formatVal(Math.abs(igst))}
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
                {symbol}
                {formatVal(Math.abs(total))}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
