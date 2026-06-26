import { InvoicePreviewProps } from "@/types/invoice";

export function InvoicePreviewFooter({ data }: InvoicePreviewProps) {
  return (
    <div style={{ marginTop: "22px", fontSize: "9pt", lineHeight: "1.8" }}>
      <div>
        <strong>VAT NO:</strong> {data?.vatNo}
      </div>
      <div>Company Registered in England and Wales No: 14326005</div>
      <br />
      <div>
        <strong>BANK:</strong> {data?.bank}
      </div>
      <div>
        <strong>A/C No:</strong> {data?.accountNo}
      </div>
      <div>
        <strong>Sort Code:</strong> {data?.sortCode}
      </div>
    </div>
  );
}
