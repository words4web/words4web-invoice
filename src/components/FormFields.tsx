import { FormInputProps, FormTextareaProps } from "@/types/forms";

const labelCls =
  "block text-xs font-semibold text-gray-500 uppercase mb-1 tracking-wide";
const inputCls =
  "w-full border border-gray-200 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400";

export function FormInput({
  label,
  value,
  onChange,
  className = "",
  ...props
}: FormInputProps) {
  return (
    <div className={className}>
      <label className={labelCls}>{label}</label>
      <input
        className={inputCls}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
  );
}

export function FormTextarea({
  label,
  value,
  onChange,
  className = "",
  ...props
}: FormTextareaProps) {
  return (
    <div className={className}>
      <label className={labelCls}>{label}</label>
      <textarea
        className={`${inputCls} resize-none`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
  );
}
