import { FormTextarea } from "./FormFields";
import { ClientDetailsFormProps } from "@/types/forms";

export function ClientDetailsForm({
  clientAddress,
  onChangeField,
}: ClientDetailsFormProps) {
  return (
    <section>
      <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b pb-1">
        Client / Billed To
      </h2>
      <div className="space-y-3">
        <FormTextarea
          label="Client Address"
          rows={3}
          placeholder="Client Name&#10;Client Address&#10;City, State, Zip"
          value={clientAddress}
          onChange={(val) => onChangeField("clientAddress", val)}
        />
      </div>
    </section>
  );
}
