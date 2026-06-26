import { InvoicePreviewProps } from "@/types/invoice";
import { COMPANY } from "@/data/company";
import { PhoneIcon, GlobeIcon, MapPinIcon } from "@/data/icons";

export function InvoicePreviewFooter({ data }: InvoicePreviewProps) {
  const ownerPhone = data.ownerPhone || COMPANY.phones[0];
  const ownerEmail = data.ownerEmail || COMPANY.email;

  return (
    <div style={{ marginTop: "16px", fontSize: "9pt" }}>
      {/* TERMS AND CONDITIONS */}
      <div
        style={{
          marginTop: "20px",
          fontSize: "8pt",
          borderTop: "2px solid #000",
          paddingTop: "10px",
          lineHeight: "1.45",
        }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "8.5pt",
            marginBottom: "4px",
            textTransform: "uppercase",
          }}>
          TERMS AND CONDITIONS
        </div>
        <div style={{ whiteSpace: "pre-wrap", color: "#444" }}>
          {data.termsAndConditions}
        </div>
        <div style={{ marginTop: "6px", color: "#111" }}>
          For any enquiry, reach out via email to{" "}
          <a
            href={`mailto:${ownerEmail}`}
            style={{ color: "#111", textDecoration: "none" }}>
            {ownerEmail}
          </a>
          , call to{" "}
          <a
            href={`tel:${ownerPhone}`}
            style={{ color: "#111", textDecoration: "none" }}>
            {ownerPhone}
          </a>
        </div>
      </div>

      {/* HORIZONTAL CONTACT INFO BLOCK */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginTop: "10px",
          paddingTop: "15px",
          fontSize: "7.5pt",
          color: "#555",
        }}>
        {/* Phone */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: "#7A0000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "2px",
            }}>
            <PhoneIcon width="12" height="12" stroke="#fff" />
          </div>
          <span style={{ fontWeight: "600" }}>
            {ownerPhone.replace(/\s+/g, "").replace("+91", "+91 ")}
          </span>
        </div>

        {/* Website */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: "#7A0000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "2px",
            }}>
            <GlobeIcon width="12" height="12" stroke="#fff" />
          </div>
          <a
            href={data.ownerWebsite || COMPANY.website}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#555",
              textDecoration: "none",
              fontWeight: "600",
            }}>
            {(data.ownerWebsite || COMPANY.website).replace(/\/$/, "")}
          </a>
        </div>

        {/* Address */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            maxWidth: "250px",
          }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: "#7A0000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "2px",
              flexShrink: 0,
            }}>
            <MapPinIcon width="12" height="12" stroke="#fff" />
          </div>
          <div style={{ lineHeight: "1.35", fontWeight: "600" }}>
            5037, SSRF, Near City Center Mall,
            <br />
            Lavate Nagar, Nashik 422002
          </div>
        </div>
      </div>
    </div>
  );
}
