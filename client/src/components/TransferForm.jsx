import React, { useState } from "react";

const TransferForm = ({ onTransfer, selectedUser }) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !selectedUser) return;

    setIsLoading(true);
    try {
      await onTransfer(selectedUser._id, parseFloat(amount));
      setAmount("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Send Money</h2>

      {selectedUser ? (
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <p className="font-medium">
            To: {selectedUser.firstName} {selectedUser.lastName}
          </p>
          <p className="text-sm text-gray-600">{selectedUser.username}</p>
        </div>
      ) : (
        <p className="mb-4 text-gray-500">Please select a recipient first</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium mb-2">
            Amount (₹)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            step="1"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
            required
            disabled={!selectedUser || isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={!selectedUser || !amount || isLoading}
          className="w-full py-3 px-4 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
        >
          {isLoading ? "Processing..." : "Send Money"}
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
