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
  } catch {
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

/**
 * Calculate total units (product quantities) per month from orders
 * @param {Array} orders - Array of order objects
 * @returns {Object} - Object with month-year as key and total units as value
 */
export const calculateUnitsPerMonth = (orders) => {
  if (!orders || !Array.isArray(orders)) {
    return {};
  }

  const monthlyData = {};

  orders.forEach((order) => {
    if (!order.orderDate || !order.products) {
      return;
    }

    try {
      const date = parseISO(order.orderDate);
      if (!isValid(date)) {
        return;
      }

      // Format as "YYYY-MM" for grouping
      const monthKey = format(date, "yyyy-MM");
      
      // Calculate total units for this order
      const orderUnits = order.products.reduce((sum, product) => {
        return sum + (product.quantity || 0);
      }, 0);

      // Add to monthly total
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + orderUnits;
    } catch (error) {
      console.error("Error processing order date:", order.orderDate, error);
    }
  });

  return monthlyData;
};

/**
 * Get units for current month
 * @param {Array} orders - Array of order objects
 * @returns {number} - Total units for current month
 */
export const getCurrentMonthUnits = (orders) => {
  const monthlyData = calculateUnitsPerMonth(orders);
  const currentMonth = format(new Date(), "yyyy-MM");
  return monthlyData[currentMonth] || 0;
};

/**
 * Get formatted list of months with units
 * @param {Array} orders - Array of order objects
 * @returns {Array} - Array of {month, units, displayMonth} sorted by date
 */
export const getMonthlyUnitsSummary = (orders) => {
  const monthlyData = calculateUnitsPerMonth(orders);
  
  return Object.entries(monthlyData)
    .map(([month, units]) => {
      try {
        // month is in format "YYYY-MM", create first day of month for parsing
        const date = parseISO(`${month}-01`);
        if (!isValid(date)) {
          console.error("Invalid month format:", month);
          return null;
        }
        return {
          month,
          units,
          displayMonth: format(date, "MMMM yyyy"),
        };
      } catch (error) {
        console.error("Error formatting month:", month, error);
        return null;
      }
    })
    .filter(Boolean) // Remove any null entries
    .sort((a, b) => b.month.localeCompare(a.month)); // Sort descending (newest first)
};
