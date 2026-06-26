import { InvoicePreviewProps } from "@/types/invoice";
import { COMPANY } from "@/data/company";

export function InvoicePreviewClient({ data }: InvoicePreviewProps) {
  const ownerAddress = data?.ownerAddress || COMPANY.address;
  const ownerPhone = data?.ownerPhone || COMPANY.phones[0];
  const ownerEmail = data?.ownerEmail || COMPANY.email;
  const ownerWebsite = data?.ownerWebsite || COMPANY.website;

  return (
    <div
      style={{
        margin: "16px 0",
        padding: "12px 0 8px",
        fontSize: "9pt",
        lineHeight: "1.45",
        borderBottom: "2px solid #000",
      }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}>
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "9.5pt",
              marginBottom: "4px",
              textTransform: "uppercase",
            }}>
            Billed By
          </div>
          <a
            href={ownerWebsite}
            target="_blank"
            style={{
              color: "#111",
              textDecoration: "none",
              display: "block",
              marginBottom: "4px",
            }}>
            {ownerWebsite}
          </a>
          <div style={{ whiteSpace: "pre-wrap", color: "#333" }}>
            {ownerAddress}
          </div>
          <div style={{ marginTop: "4px", color: "#333" }}>
            Email: {ownerEmail}
          </div>
          <div style={{ color: "#333" }}>Phone: {ownerPhone}</div>
        </div>
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "9.5pt",
              marginBottom: "4px",
              textTransform: "uppercase",
            }}>
            Billed To
          </div>
          <div
            style={{
              whiteSpace: "pre-wrap",
              color: "#111",
            }}>
            {data?.clientAddress || "—"}
          </div>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "12px",
          color: "#111",
          fontWeight: "normal",
        }}>
        Country of Supply: {data?.countryOfSupply || "India"}
      </div>
    </div>
  );
}
