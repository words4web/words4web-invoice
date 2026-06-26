import { FormInput, FormTextarea } from "@/components/FormFields";
import { QuotationItemRowFormProps } from "@/types/forms";

export function QuotationItemRowForm({
  idx,
  item,
  showRemove,
  onRemove,
  onChangeField,
}: QuotationItemRowFormProps) {
  return (
    <div className="border border-gray-100 rounded-lg p-3 space-y-2 bg-gray-50">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-bold text-gray-400">
          {idx + 1}. {item?.title || "New Item"}
        </span>
        {showRemove && (
          <button
            onClick={() => onRemove(idx)}
            className="text-xs text-red-400 hover:text-red-650 cursor-pointer">
            Remove
          </button>
        )}
      </div>
      <FormInput
        label="Title"
        placeholder="Title (e.g. Drainage)"
        value={item?.title}
        onChange={(val) => onChangeField(idx, "title", val)}
      />
      <FormTextarea
        label="Description"
        rows={3}
        placeholder="Detailed description of the work..."
        value={item?.description}
        onChange={(val) => onChangeField(idx, "description", val)}
      />
      <FormInput
        label="Amount"
        type="number"
        step="0.01"
        min="0"
        placeholder="Amount (e.g. 5000 — leave blank if not priced)"
        value={item?.amount}
        onChange={(val) => onChangeField(idx, "amount", val)}
      />
    </div>
  );
}
