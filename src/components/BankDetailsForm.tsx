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
  paypalId = "",
  gstNo = "",
  hsnCode = "",
  showBankDetails = true,
  onToggleBankDetails,
  accentColor = "#7A0000",
  onChangeField,
}: BankDetailsFormProps) {
  return (
    <section>
      <div className="flex items-center justify-between border-b pb-1 mb-3">
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Bank & UPI Payment Details
          </h2>
          <p className="text-[11px] text-gray-400">
            Show or hide bank details on document
          </p>
        </div>
        {onToggleBankDetails && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-gray-500">
              {showBankDetails !== false ? "Visible" : "Hidden"}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={showBankDetails !== false}
              onClick={() => onToggleBankDetails(showBankDetails === false)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                showBankDetails !== false ? "" : "bg-gray-300"
              }`}
              style={{
                backgroundColor: showBankDetails !== false ? accentColor : undefined,
              }}>
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  showBankDetails !== false ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        )}
      </div>
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
        <FormInput
          label="PayPal ID"
          placeholder="e.g. payments@words4web.com"
          value={paypalId}
          onChange={(val) => onChangeField("paypalId", val)}
        />
        <FormInput
          label="GST Number"
          placeholder="e.g. 27ABCDE1234F1Z5"
          value={gstNo}
          onChange={(val) => onChangeField("gstNo", val)}
        />
        <FormInput
          label="SAC"
          placeholder="e.g. 998314"
          value={hsnCode}
          onChange={(val) => onChangeField("hsnCode", val)}
        />
        {/*
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
              <img
                src={qrCode}
                alt="Uploaded QR Code Preview"
                className="h-20 w-auto object-contain"
              />
            </div>
          )}
        </div>
        */}
      </div>
    </section>
  );
}
