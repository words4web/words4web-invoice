import { InvoicePreviewProps } from "@/types/invoice";
import { calcInvoiceTotals } from "@/utils/invoice";
import { COMPANY } from "@/data/company";
import { PaypalIcon } from "@/data/icons";

export function InvoicePreviewSummary({ data }: InvoicePreviewProps) {
  const totals = calcInvoiceTotals(
    data.items,
    data.currency,
    data.durationMonths,
  );
  const stampPath = data?.currency === "INR" ? "/stamp.png" : "/uk_stamp.png";

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
          {data.paypalId && (
            <div
              style={{
                marginTop: "12px",
                padding: "4px 8px",
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "230px",
              }}>
              <PaypalIcon
                style={{ height: "30px", width: "auto", flexShrink: 0 }}
              />
              <span
                style={{
                  color: "#111",
                  fontWeight: "600",
                  wordBreak: "break-all",
                }}>
                {data.paypalId}
              </span>
            </div>
          )}
        </div>

        {/* UPI Scan */}
        {/*
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
        */}

        {/* Totals */}
        <div
          style={{
            minWidth: "220px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {totals.months > 1 && (
                <>
                  <tr>
                    <td
                      style={{
                        padding: "3px 12px 3px 0",
                        fontWeight: "bold",
                        textAlign: "left",
                        color: "#6b7280",
                        fontSize: "8pt",
                        whiteSpace: "nowrap",
                      }}>
                      MONTHLY TOTAL
                    </td>
                    <td
                      style={{
                        padding: "3px 0",
                        textAlign: "right",
                        whiteSpace: "nowrap",
                        fontWeight: "bold",
                        color: "#4b5563",
                        fontSize: "8pt",
                      }}>
                      {totals.fmtMonthlyTotal} / mo
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3px 12px 6px 0",
                        fontWeight: "bold",
                        textAlign: "left",
                        color: "#7A0000",
                        fontSize: "8pt",
                        whiteSpace: "nowrap",
                        borderBottom: "1px dashed #e5e7eb",
                      }}>
                      DURATION
                    </td>
                    <td
                      style={{
                        padding: "3px 0 6px 0",
                        textAlign: "right",
                        whiteSpace: "nowrap",
                        fontWeight: "bold",
                        color: "#7A0000",
                        fontSize: "8pt",
                        borderBottom: "1px dashed #e5e7eb",
                      }}>
                      {totals.months} Months (×{totals.months})
                    </td>
                  </tr>
                </>
              )}
              <tr>
                <td
                  style={{
                    padding:
                      totals.months > 1 ? "6px 12px 4px 0" : "4px 12px 4px 0",
                    fontWeight: "bold",
                    textAlign: "left",
                    color: "#555",
                    fontSize: "8.5pt",
                    whiteSpace: "nowrap",
                  }}>
                  {totals.months > 1
                    ? `SUBTOTAL (${totals.months}M)`
                    : "SUBTOTAL"}
                </td>
                <td
                  style={{
                    padding: totals.months > 1 ? "6px 0 4px 0" : "4px 0",
                    textAlign: "right",
                    whiteSpace: "nowrap",
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
                    padding: "4px 12px 4px 0",
                    fontWeight: "bold",
                    textAlign: "left",
                    color: "#555",
                    fontSize: "8.5pt",
                    whiteSpace: "nowrap",
                  }}>
                  {data.currency === "MYR"
                    ? "SST"
                    : data.currency && data.currency !== "INR"
                      ? "VAT"
                      : "TAX"}
                </td>
                <td
                  style={{
                    padding: "4px 0",
                    textAlign: "right",
                    whiteSpace: "nowrap",
                    fontWeight: "bold",
                    color: "#111",
                    fontSize: "8.5pt",
                  }}>
                  {totals.fmtVatWithSym}
                </td>
              </tr>
              <tr style={{ color: "#111" }}>
                <td
                  style={{
                    padding: "6px 12px 6px 0",
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: "10pt",
                    whiteSpace: "nowrap",
                    borderTop: "1px solid #111",
                  }}>
                  {totals.months > 1 ? "INVOICE TOTAL" : "TOTAL"}
                </td>
                <td
                  style={{
                    padding: "6px 0",
                    textAlign: "right",
                    whiteSpace: "nowrap",
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "220px",
          }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/deepali.sign.jpeg"
            alt="Signature"
            style={{
              height: "45px",
              width: "auto",
              display: "block",
              marginBottom: "-4px",
            }}
          />
          <div
            style={{
              fontSize: "8pt",
              color: "#333",
              borderTop: "1px solid #333",
              paddingTop: "4px",
              width: "100%",
              textAlign: "center",
            }}>
            Accounts and Business Development
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={stampPath}
            alt="Stamp"
            style={{
              height: "65px",
              width: "auto",
              display: "block",
              marginTop: "6px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
