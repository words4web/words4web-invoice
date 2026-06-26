import { useCallback } from "react";

export function usePaymentTerms<
  TData extends { paymentTerms?: TTerm[] },
  TTerm,
>(
  setData: React.Dispatch<React.SetStateAction<TData>>,
  defaultTerms: TTerm[],
  emptyTerm: () => TTerm,
) {
  const setPaymentTerm = useCallback(
    <K extends keyof TTerm>(idx: number, field: K, value: TTerm[K]) => {
      setData((d) => ({
        ...d,
        paymentTerms: (d?.paymentTerms || defaultTerms)?.map((term, i) =>
          i === idx ? { ...term, [field]: value } : term,
        ) as TTerm[],
      }));
    },
    [setData, defaultTerms],
  );

  const addPaymentTerm = useCallback(() => {
    setData((d) => ({
      ...d,
      paymentTerms: [
        ...(d?.paymentTerms || defaultTerms),
        emptyTerm(),
      ] as TTerm[],
    }));
  }, [setData, defaultTerms, emptyTerm]);

  const removePaymentTerm = useCallback(
    (idx: number) => {
      setData((d) => ({
        ...d,
        paymentTerms: (d?.paymentTerms || defaultTerms)?.filter(
          (_, i) => i !== idx,
        ) as TTerm[],
      }));
    },
    [setData, defaultTerms],
  );

  return {
    setPaymentTerm,
    addPaymentTerm,
    removePaymentTerm,
  };
}
