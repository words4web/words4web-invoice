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
        <span className="text-xs font-semibold text-gray-400">
          Item {idx + 1}
        </span>
        {showRemove && (
          <button
            onClick={() => onRemove(idx)}
            className="text-xs text-red-500 hover:text-red-750 cursor-pointer font-medium">
            Remove
          </button>
        )}
      </div>
      <FormTextarea
        label="Description / Items"
        rows={2}
        placeholder="Website Creation"
        value={item?.description}
        onChange={(val) => onChangeField(idx, "description", val)}
      />
      <div className="grid grid-cols-3 gap-2">
        <FormInput
          label="GST Rate (%)"
          type="number"
          placeholder="0"
          value={item?.gstRate}
          onChange={(val) => onChangeField(idx, "gstRate", val)}
        />
        <FormInput
          label="Qty"
          type="number"
          placeholder="1"
          value={item?.qty}
          onChange={(val) => onChangeField(idx, "qty", val)}
        />
        <FormInput
          label="Rate (₹)"
          type="number"
          placeholder="0"
          value={item?.rate}
          onChange={(val) => onChangeField(idx, "rate", val)}
        />
      </div>
    </div>
  );
}
