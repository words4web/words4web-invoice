import { FormInput, FormTextarea } from "./FormFields";
import { OwnerDetailsFormProps } from "@/types/forms";

export function OwnerDetailsForm({
  ownerAddress,
  ownerPhone,
  ownerEmail,
  ownerWebsite,
  onChangeField,
}: OwnerDetailsFormProps) {
  return (
    <section>
      <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b pb-1">
        Company Details (Owner)
      </h2>
      <div className="space-y-3">
        <FormTextarea
          label="Company Address"
          rows={3}
          placeholder="106 Valley Drive Gravesend, Kent&#10;DA12 5RX"
          value={ownerAddress}
          onChange={(val) => onChangeField("ownerAddress", val)}
        />
        <FormInput
          label="Phone Number(s)"
          placeholder="07875592595 / 07957200577 / 01474520536"
          value={ownerPhone}
          onChange={(val) => onChangeField("ownerPhone", val)}
        />
        <FormInput
          label="Email Address"
          type="email"
          placeholder="liveconstructionsltd@gmail.com"
          value={ownerEmail}
          onChange={(val) => onChangeField("ownerEmail", val)}
        />
        <FormInput
          label="Website"
          type="url"
          placeholder="https://liveconstructionsltd.co.uk"
          value={ownerWebsite}
          onChange={(val) => onChangeField("ownerWebsite", val)}
        />
      </div>
    </section>
  );
}
