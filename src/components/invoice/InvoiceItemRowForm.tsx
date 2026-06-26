import { FormInput, FormTextarea } from "../FormFields";
import { InvoiceItemRowFormProps } from "@/types/forms";

export function InvoiceItemRowForm({
  idx,
  item,
  showRemove,
  onRemove,
  onChangeField,
}: InvoiceItemRowFormProps) {
  return (
    <div className="border border-gray-100 rounded-lg p-3 space-y-2 bg-gray-50">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-gray-400">
          Item {idx + 1}
        </span>
        {showRemove && (
          <button
            onClick={onRemove}
            className="text-xs text-red-400 hover:text-red-655 cursor-pointer">
            Remove
          </button>
        )}
      </div>
      <FormTextarea
        label="Description"
        rows={2}
        placeholder="Description"
        value={item?.description}
        onChange={(val) => onChangeField("description", val)}
      />
      <FormInput
        label="Amount"
        type="number"
        step="0.01"
        min="0"
        placeholder="Amount (e.g. 2500)"
        value={item?.amount}
        onChange={(val) => onChangeField("amount", val)}
      />
    </div>
  );
}
