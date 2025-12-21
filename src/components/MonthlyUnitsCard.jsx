import { useState } from "react";
import PropTypes from "prop-types";
import { getMonthlyUnitsSummary, getCurrentMonthUnits } from "../utils/utils";

const MonthlyUnitsCard = ({ orders }) => {
  const [showAllMonths, setShowAllMonths] = useState(false);
  
  const currentMonthUnits = getCurrentMonthUnits(orders);
  const monthlySummary = getMonthlyUnitsSummary(orders);
  
  // Calculate total units across all time
  const totalUnits = monthlySummary.reduce((sum, month) => sum + month.units, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Units per Month</h2>
      
      {/* Current Month Stats */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Current Month</p>
        <p className="text-3xl font-bold text-blue-600">{currentMonthUnits}</p>
        <p className="text-sm text-gray-500">units ordered</p>
      </div>

      {/* Total Stats */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">All Time Total</p>
        <p className="text-2xl font-bold text-gray-700">{totalUnits}</p>
        <p className="text-sm text-gray-500">total units ordered</p>
      </div>

      {/* Monthly Breakdown */}
      {monthlySummary.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowAllMonths(!showAllMonths)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-3 flex items-center"
          >
            {showAllMonths ? "Hide" : "Show"} monthly breakdown
            <span className="ml-1">{showAllMonths ? "▲" : "▼"}</span>
          </button>
          
          {showAllMonths && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {monthlySummary.map(({ month, units, displayMonth }) => (
                <div
                  key={month}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-700">{displayMonth}</span>
                  <span className="font-semibold text-gray-900">{units} units</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {monthlySummary.length === 0 && (
        <p className="text-gray-500 text-center py-4">
          No orders yet. Create an order to start tracking units.
        </p>
      )}
    </div>
  );
};

MonthlyUnitsCard.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      orderDate: PropTypes.string.isRequired,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          quantity: PropTypes.number.isRequired,
          unitPrice: PropTypes.number,
          lineTotal: PropTypes.number,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default MonthlyUnitsCard;
