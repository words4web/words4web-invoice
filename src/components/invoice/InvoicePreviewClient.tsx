import { InvoicePreviewProps } from "@/types/invoice";

export function InvoicePreviewClient({ data }: InvoicePreviewProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "14px 0 20px",
        fontSize: "9.5pt",
      }}>
      <div>
        <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
          Client Address:
        </div>
        <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
          {data?.clientAddress || "—"}
        </div>
      </div>
      <div style={{ textAlign: "right", whiteSpace: "pre-wrap" }}>
        For: {data?.forProject}
      </div>
    </div>
  );
}
