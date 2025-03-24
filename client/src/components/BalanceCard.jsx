import React from "react";

const BalanceCard = ({ balance }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-2">Your Balance</h2>
      <div className="flex items-baseline">
        <span className="text-4xl font-bold">₹{balance}</span>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-gray-600 text-sm">Available for transfer</p>
      </div>
    </div>
  );
};

export default BalanceCard;
