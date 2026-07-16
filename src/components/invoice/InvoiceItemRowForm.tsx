import { FormInput, FormTextarea } from "../FormFields";
import { InvoiceItemRowFormProps } from "@/types/forms";

export function InvoiceItemRowForm({
  idx,
  item,
  showRemove,
  onRemove,
  onChangeField,
  currency = "INR",
}: InvoiceItemRowFormProps) {
  const isVat = currency !== "INR";
  const taxLabel = isVat ? "VAT Rate (%)" : "GST Rate (%)";

  const currencySymbols = {
    INR: "₹",
    EUR: "€",
    GBP: "£",
  };
  const symbol = currencySymbols[currency] || "₹";
  const rateLabel = `Rate (${symbol})`;

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
          label={taxLabel}
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
        <div className="flex flex-col">
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 tracking-wide">
            {rateLabel}
          </label>
          <div className="flex rounded shadow-sm">
            <button
              type="button"
              onClick={() => onChangeField("isNegative", !item?.isNegative)}
              className={`px-2.5 py-1.5 text-sm font-bold border border-r-0 rounded-l transition-colors duration-150 cursor-pointer flex items-center justify-center min-w-[32px] ${
                item?.isNegative
                  ? "bg-red-50 border-red-200 text-red-650 hover:bg-red-100"
                  : "bg-green-50 border-green-200 text-green-650 hover:bg-green-100"
              }`}
              title={
                item?.isNegative ? "Negative (discount/deduction)" : "Positive"
              }>
              {item?.isNegative ? "−" : "+"}
            </button>
            <input
              type="number"
              placeholder="0"
              min={0}
              value={item?.rate}
              onChange={(e) =>
                onChangeField(
                  "rate",
                  String(Math.max(0, Number(e.target.value))),
                )
              }
              className="w-full border border-gray-200 rounded rounded-l-none px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
