export interface Currency {
  code: string;
  name: string;
  symbol?: string; // Optional if we want to add symbols later
}

const CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound Sterling", symbol: "£" },

  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },

  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },

  { code: "PLN", name: "Polish Złoty", symbol: "zł" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
  { code: "RON", name: "Romanian Leu", symbol: "lei" },
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв" },

  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "ILS", name: "Israeli New Shekel", symbol: "₪" },

  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "SAR", name: "Saudi Riyal", symbol: "ر.س" },
  { code: "QAR", name: "Qatari Riyal", symbol: "ر.ق" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك" },
  { code: "BHD", name: "Bahraini Dinar", symbol: ".د.ب" },
  { code: "OMR", name: "Omani Rial", symbol: "ر.ع." },
  { code: "JOD", name: "Jordanian Dinar", symbol: "د.ا" },
  { code: "EGP", name: "Egyptian Pound", symbol: "E£" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "د.م." },

  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "Rs" },

  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫" },

  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "CNY", name: "Chinese Yuan Renminbi", symbol: "CN¥" },
  { code: "TWD", name: "New Taiwan Dollar", symbol: "NT$" },

  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "MXN", name: "Mexican Peso", symbol: "MX$" },
  { code: "CLP", name: "Chilean Peso", symbol: "CLP$" },
  { code: "COP", name: "Colombian Peso", symbol: "COL$" },
  { code: "PEN", name: "Peruvian Sol", symbol: "S/" },
  { code: "ARS", name: "Argentine Peso", symbol: "ARS$" },
  { code: "UYU", name: "Uruguayan Peso", symbol: "$U" },

  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳" },

  // CFA currencies
  { code: "XOF", name: "West African CFA Franc", symbol: "CFA" },
  { code: "XAF", name: "Central African CFA Franc", symbol: "FCFA" },
];

const sortedCurrencies = [...CURRENCIES].sort((a, b) =>
  a.code.localeCompare(b.code)
);

/**
 * Hook to get the list of supported currencies.
 * You can add more currencies to the CURRENCIES array above.
 */
export const useCurrencies = () => {
  return {
    currencies: sortedCurrencies,
  };
};

/**
 * Helper to get the symbol for a specific currency code
 */
export const getCurrencySymbol = (code: string | undefined): string => {
  if (!code) return "$";
  const currency = CURRENCIES.find((c) => c.code === code);
  return currency?.symbol || code;
};
