import { FormInput } from "./FormFields";
import { BankDetailsFormProps } from "@/types/forms";

export function BankDetailsForm({
  bank,
  accountName,
  accountNo,
  ifsc,
  accountType,
  upiId,
  qrCode,
  onChangeField,
}: BankDetailsFormProps) {
  return (
    <section>
      <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b pb-1">
        Bank & UPI Payment Details
      </h2>
      <div className="space-y-3">
        <FormInput
          label="Account Name"
          placeholder="e.g. Words4Web"
          value={accountName}
          onChange={(val) => onChangeField("accountName", val)}
        />
        <FormInput
          label="Account Number"
          placeholder="e.g. 12860200038225"
          value={accountNo}
          onChange={(val) => onChangeField("accountNo", val)}
        />
        <FormInput
          label="IFSC Code"
          placeholder="e.g. FDRL0001286"
          value={ifsc}
          onChange={(val) => onChangeField("ifsc", val)}
        />
        <FormInput
          label="Account Type"
          placeholder="e.g. Current"
          value={accountType}
          onChange={(val) => onChangeField("accountType", val)}
        />
        <FormInput
          label="Bank Name"
          placeholder="e.g. Federal Bank"
          value={bank}
          onChange={(val) => onChangeField("bank", val)}
        />
        <FormInput
          label="UPI ID"
          placeholder="e.g. 9765050101-2@ybl"
          value={upiId}
          onChange={(val) => onChangeField("upiId", val)}
        />
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 tracking-wide">
            Custom UPI QR Code
          </label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="qr-upload-input"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (typeof reader.result === "string") {
                      onChangeField("qrCode", reader.result);
                    }
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <label
              htmlFor="qr-upload-input"
              className="cursor-pointer px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-xs font-semibold text-gray-700 transition-colors inline-block text-center flex-1">
              {qrCode ? "Change QR Code" : "Upload Custom QR"}
            </label>
            {qrCode && (
              <button
                type="button"
                onClick={() => onChangeField("qrCode", "")}
                className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-semibold transition-colors">
                Clear
              </button>
            )}
          </div>
          {qrCode && (
            <div className="mt-2 flex justify-center border border-gray-200 p-2 bg-gray-50 rounded">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrCode}
                alt="Uploaded QR Code Preview"
                className="h-20 w-auto object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
