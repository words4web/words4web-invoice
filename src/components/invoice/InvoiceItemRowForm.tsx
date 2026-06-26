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
            className="text-xs text-red-500 hover:text-red-750 cursor-pointer font-medium">
            Remove
          </button>
        )}
      </div>
      <FormTextarea
        label="Description / Items"
        rows={2}
        placeholder="Monthly Digital Marketing Services"
        value={item?.description}
        onChange={(val) => onChangeField("description", val)}
      />
      <div className="grid grid-cols-3 gap-2">
        <FormInput
          label="GST Rate (%)"
          type="number"
          placeholder="0"
          min={0}
          max={100}
          value={item?.gstRate}
          onChange={(val) =>
            onChangeField(
              "gstRate",
              String(Math.max(0, Math.min(100, Number(val)))),
            )
          }
        />
        <FormInput
          label="Qty"
          type="number"
          placeholder="1"
          min={1}
          value={item?.qty}
          onChange={(val) =>
            onChangeField("qty", String(Math.max(1, Number(val))))
          }
        />
        <FormInput
          label="Rate (₹)"
          type="number"
          placeholder="0"
          min={1}
          value={item?.rate}
          onChange={(val) =>
            onChangeField("rate", String(Math.max(1, Number(val))))
          }
        />
      </div>
    </div>
  );
}
