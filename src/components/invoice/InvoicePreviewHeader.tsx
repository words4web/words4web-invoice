import { InvoicePreviewProps } from "@/types/invoice";
import { COMPANY } from "@/data/company";
import {
  PinIcon,
  PhoneIcon,
  EmailIcon,
  WebsiteIcon,
} from "@/components/CompanyIcons";

export function InvoicePreviewHeader({ data }: InvoicePreviewProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "24px",
      }}>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Live Constructions Ltd"
          style={{ width: "220px", height: "auto" }}
        />
        <div
          style={{
            marginTop: "10px",
            fontSize: "8.5pt",
            lineHeight: "1.65",
            color: "#000",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
            }}>
            <div style={{ flexShrink: 0, marginTop: "3px" }}>
              <PinIcon />
            </div>
            <div
              style={{
                fontWeight: "bold",
                color: "#000",
                lineHeight: "1.45",
                whiteSpace: "pre-wrap",
              }}>
              {data?.ownerAddress || COMPANY.address}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
            }}>
            <div style={{ flexShrink: 0, marginTop: "3px" }}>
              <PhoneIcon />
            </div>
            <div
              style={{
                fontWeight: "bold",
                color: "#000",
                lineHeight: "1.45",
                whiteSpace: "pre-wrap",
              }}>
              {(data?.ownerPhone || COMPANY.phones.join(" / "))
                .split(/\s*[\/\n]\s*/)
                .filter(Boolean)
                .join("\n")}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}>
            <div style={{ flexShrink: 0 }}>
              <EmailIcon />
            </div>
            <div
              style={{
                fontWeight: "bold",
                color: "#000",
                lineHeight: "1.45",
              }}>
              {data?.ownerEmail || COMPANY.email}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}>
            <div style={{ flexShrink: 0 }}>
              <WebsiteIcon />
            </div>
            <div
              style={{
                fontWeight: "bold",
                color: "#000",
                lineHeight: "1.45",
              }}>
              {data?.ownerWebsite || COMPANY.website}
            </div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "right", minWidth: "240px" }}>
        <div
          style={{
            background: "#1a56a0",
            height: "28px",
            clipPath: "polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)",
            marginBottom: "8px",
          }}
        />
        <div
          style={{
            fontSize: "24pt",
            fontWeight: 900,
            color: "#4a4a4a",
            marginBottom: "10px",
          }}>
          INVOICE
        </div>
        <table
          style={{
            marginLeft: "auto",
            fontSize: "9pt",
            borderCollapse: "collapse",
          }}>
          <tbody>
            <tr>
              <td
                style={{
                  fontWeight: "bold",
                  paddingRight: "10px",
                  textAlign: "left",
                }}>
                INVOICE NO.
              </td>
              <td>{data?.invoiceNo || "—"}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold", textAlign: "left" }}>DATE:</td>
              <td>{data?.date || "—"}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold", textAlign: "left" }}>UTR NO.</td>
              <td>{data?.utrNo || "—"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
