import { PaymentTermRowFormProps } from "@/types/forms";

export function PaymentTermRowForm({
  idx,
  term,
  showRemove,
  onRemove,
  onChangeField,
}: PaymentTermRowFormProps) {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        className="flex-1 border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
        value={term.description}
        onChange={(e) => onChangeField(idx, "description", e.target.value)}
        placeholder="Description"
      />
      <input
        type="text"
        className="w-16 border border-gray-200 rounded px-2 py-1.5 text-xs text-right focus:outline-none focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400"
        value={term.percentage}
        onChange={(e) => onChangeField(idx, "percentage", e.target.value)}
        placeholder="20%"
      />
      {showRemove && (
        <button
          onClick={() => onRemove(idx)}
          className="text-red-400 hover:text-red-650 text-sm px-1 cursor-pointer">
          ✕
        </button>
      )}
    </div>
  );
}
