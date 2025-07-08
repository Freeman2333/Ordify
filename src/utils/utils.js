export const formatDate = (
  dateStr,
  locale = "en-US",
  options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
) => {
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat(locale, options).format(date);
  } catch (_) {
    console.error("Invalid date:", dateStr);
    return "";
  }
};

export const formatCurrency = (amount, locale = "en-US", currency = "USD") => {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(amount);
  } catch (_) {
    console.error("Invalid currency format:", amount);
    return "";
  }
};
