import { QuotationPreviewProps } from "@/types/quotation";
import { DEFAULT_PAYMENT_TERMS } from "@/data/quotation";

export function QuotationPreviewFooter({ data }: QuotationPreviewProps) {
  return (
    <>
      {/* PAYMENT TERMS */}
      <div style={{ marginTop: "28px", fontSize: "9.5pt" }}>
        <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
          The terms of payment are as follows:
        </div>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "9.5pt",
            marginTop: "6px",
          }}>
          <tbody>
            {(data?.paymentTerms || DEFAULT_PAYMENT_TERMS)?.map((term, idx) => (
              <tr key={idx}>
                <td
                  style={{
                    padding: "2px 0",
                    textAlign: "left",
                    verticalAlign: "top",
                  }}>
                  {term?.description}
                </td>
                <td
                  style={{
                    padding: "2px 0",
                    textAlign: "right",
                    width: "80px",
                    fontWeight: "bold",
                    verticalAlign: "top",
                  }}>
                  {term?.percentage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGE FOOTER */}
      <div
        style={{
          marginTop: "24px",
          fontSize: "8pt",
          color: "#444",
          borderTop: "0.5px solid #ccc",
          paddingTop: "6px",
        }}>
        <div>
          VAT NO: &nbsp;&nbsp; Company Registered in England and Wales No:
          14326005
        </div>
      </div>
    </>
  );
}
