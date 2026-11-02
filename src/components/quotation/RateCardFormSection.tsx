import { RateCardItem } from "@/types/quotation";
import { FormInput, FormTextarea } from "@/components/FormFields";

interface RateCardFormSectionProps {
  showRateCard: boolean;
  rateCardTitle: string;
  rateCardNote: string;
  rateCardItems: RateCardItem[];
  currencySymbol: string;
  onToggle: (show: boolean) => void;
  onTitleChange: (title: string) => void;
  onNoteChange: (note: string) => void;
  onItemsChange: (items: RateCardItem[]) => void;
}

export function RateCardFormSection({
  showRateCard,
  rateCardTitle,
  rateCardNote,
  rateCardItems,
  currencySymbol,
  onToggle,
  onTitleChange,
  onNoteChange,
  onItemsChange,
}: RateCardFormSectionProps) {
  const handleItemChange = (
    index: number,
    field: keyof RateCardItem,
    val: string,
  ) => {
    const updated = [...(rateCardItems || [])];
    updated[index] = { ...updated[index], [field]: val };
    onItemsChange(updated);
  };

  const handleAddItem = () => {
    onItemsChange([...(rateCardItems || []), { particular: "", rate: "" }]);
  };

  const handleRemoveItem = (index: number) => {
    const updated = (rateCardItems || []).filter((_, i) => i !== index);
    onItemsChange(updated);
  };

  return (
    <section className="bg-gray-50 border border-gray-150 rounded-lg p-3 space-y-3">
      {/* Header with Switch */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wide block">
            Revision & Scope Rate Card
          </label>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Add extra charges / rate card for revisions & out-of-scope work
          </p>
        </div>
        <button
          type="button"
          onClick={() => onToggle(!showRateCard)}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            showRateCard ? "bg-[#8C52FF]" : "bg-gray-200"
          }`}>
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              showRateCard ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {showRateCard && (
        <div className="pt-2 border-t border-gray-200/60 space-y-3">
          {/* Section Title */}
          <FormInput
            label="Section Title"
            placeholder="e.g. REVISION & ADDITIONAL SCOPE RATE CARD"
            value={rateCardTitle}
            onChange={onTitleChange}
          />

          {/* Scope Note / Policy */}
          <FormTextarea
            label="Scope Note / Policy Description"
            rows={3}
            placeholder="e.g. Note 1: Base quote covers up to 3 rounds of changes. Any changes exceeding will be charged as below:"
            value={rateCardNote}
            onChange={onNoteChange}
          />

          {/* Items List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Rate Card Line Items
              </label>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-xs text-[#8C52FF] hover:text-[#7236e6] font-semibold cursor-pointer">
                + Add Rate Item
              </button>
            </div>

            {(rateCardItems || []).map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg p-2.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-400">
                    Item {idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(idx)}
                    className="text-[11px] text-red-500 hover:text-red-700 cursor-pointer font-medium">
                    Remove
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="e.g. Text adjustments only / round"
                  value={item.particular}
                  onChange={(e) =>
                    handleItemChange(idx, "particular", e.target.value)
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded px-2.5 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#8C52FF]"
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">
                    Rate ({currencySymbol}):
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. 1450 or At actuals"
                    value={item.rate}
                    onChange={(e) =>
                      handleItemChange(idx, "rate", e.target.value)
                    }
                    className="flex-1 bg-gray-50 border border-gray-200 rounded px-2.5 py-1 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#8C52FF]"
                  />
                </div>
              </div>
            ))}

            {(rateCardItems || []).length === 0 && (
              <button
                type="button"
                onClick={handleAddItem}
                className="w-full border-2 border-dashed border-gray-200 hover:border-[#8C52FF] rounded-lg p-3 text-xs text-gray-500 hover:text-[#8C52FF] transition-colors font-medium">
                + Add first rate item
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
