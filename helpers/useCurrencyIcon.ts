import { ECurrency } from "@/types/accountType";
import { useMemo } from "react";

export const useCurrencyIcon = (currency: ECurrency) => {
  const currencyIcons: Record<ECurrency, string> = useMemo(
    () => ({
      [ECurrency.USD]: "$",
      [ECurrency.BDT]: "৳",
      [ECurrency.INR]: "₹",
      [ECurrency.EUR]: "€",
      [ECurrency.GBP]: "£",
      [ECurrency.JPY]: "¥",
      [ECurrency.CAD]: "C$",
      [ECurrency.AUD]: "A$",
      [ECurrency.SGD]: "S$",
      [ECurrency.CHF]: "Fr",
      [ECurrency.CNY]: "¥",
    }),
    []
  );

  return currencyIcons[currency] || "💰";
};
