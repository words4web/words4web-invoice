import { RateCardItem } from "@/types/quotation";

interface QuotationPreviewRateCardProps {
  showRateCard?: boolean;
  rateCardTitle?: string;
  rateCardNote?: string;
  rateCardItems?: RateCardItem[];
  currency?: "INR" | "EUR" | "GBP" | "MYR" | "USD";
}

export function QuotationPreviewRateCard({
  showRateCard,
  rateCardTitle = "REVISION & ADDITIONAL SCOPE RATE CARD",
  rateCardNote,
  rateCardItems,
  currency = "INR",
}: QuotationPreviewRateCardProps) {
  if (!showRateCard) return null;

  const validItems =
    rateCardItems?.filter((item) => item.particular || item.rate) || [];

  if (validItems.length === 0 && !rateCardNote) return null;

  const currencySymbols = {
    INR: "₹",
    EUR: "€",
    GBP: "£",
    MYR: "RM",
    USD: "$",
  };
  const currencyLocales = {
    INR: "en-IN",
    EUR: "en-IE",
    GBP: "en-GB",
    MYR: "en-MY",
    USD: "en-US",
  };

  const symbol = currencySymbols[currency] || "₹";
  const locale = currencyLocales[currency] || "en-IN";

  const formatRate = (raw: string) => {
    const num = parseFloat(raw);
    if (isNaN(num)) return raw; // if user typed text like "At actuals"
    return num % 1 === 0
      ? `${symbol} ${num.toLocaleString(locale, { maximumFractionDigits: 0 })}`
      : `${symbol} ${num.toLocaleString(locale, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
  };

  return (
    <div
      style={{
        marginTop: "24px",
        marginBottom: "20px",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}>
      {/* Title */}
      <div
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "9.5pt",
          fontWeight: 700,
          color: "#8C52FF",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          borderBottom: "1.5px solid #8C52FF",
          paddingBottom: "4px",
          marginBottom: "8px",
          wordBreak: "break-word",
          overflowWrap: "anywhere",
          boxSizing: "border-box",
          maxWidth: "100%",
        }}>
        {rateCardTitle || "REVISION & ADDITIONAL SCOPE RATE CARD"}
      </div>

      {/* Scope / Terms Note if any */}
      {rateCardNote && (
        <div
          style={{
            fontSize: "8pt",
            color: "#444",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowWrap: "anywhere",
            lineHeight: "1.45",
            marginBottom: "8px",
            fontStyle: "italic",
            backgroundColor: "#fcfaff",
            borderLeft: "3px solid #8C52FF",
            padding: "5px 8px",
            boxSizing: "border-box",
            maxWidth: "100%",
          }}>
          {rateCardNote}
        </div>
      )}

      {/* Rate card Table */}
      {validItems.length > 0 && (
        <table
          style={{
            width: "100%",
            tableLayout: "fixed",
            borderCollapse: "collapse",
            fontSize: "8.5pt",
          }}>
          <thead>
            <tr
              style={{
                background: "#f3ebff",
                borderBottom: "1px solid #8C52FF",
              }}>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "5px 8px",
                  textAlign: "left",
                  fontWeight: "bold",
                  color: "#333",
                  fontSize: "8pt",
                }}>
                PARTICULARS / SCOPE ITEM
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "5px 8px",
                  textAlign: "right",
                  fontWeight: "bold",
                  color: "#333",
                  width: "140px",
                  fontSize: "8pt",
                }}>
                RATE ({symbol})
              </th>
            </tr>
          </thead>
          <tbody>
            {validItems.map((item, idx) => (
              <tr
                key={idx}
                style={{
                  background: idx % 2 === 0 ? "#ffffff" : "#fafafa",
                }}>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "5px 8px",
                    textAlign: "left",
                    color: "#222",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                  }}>
                  {item.particular}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "5px 8px",
                    textAlign: "right",
                    fontWeight: 600,
                    color: "#111",
                    width: "140px",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                    boxSizing: "border-box",
                  }}>
                  {formatRate(item.rate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
