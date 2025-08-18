import { parseISO, format, isValid } from "date-fns";

export const formatDate = (input, formatStr = "MMM d, yyyy") => {
  try {
    let date;

    if (input instanceof Date) {
      date = input;
    } else if (typeof input === "string") {
      date = parseISO(input);
    } else {
      throw new Error("Unsupported input type");
    }

    if (!isValid(date)) {
      throw new Error("Invalid Date");
    }

    return format(date, formatStr);
  } catch (error) {
    console.error("Invalid date:", input, error);
    return null;
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
    return null;
  }
};

export const generateId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
