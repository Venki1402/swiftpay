import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserList from "../components/UserList";
import TransferForm from "../components/TransferForm";
import { getUsers, transferMoney, getBalance } from "../utils/api";

const Send = ({ token }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [userFilter, setUserFilter] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        // Fetch users
        const usersResponse = await getUsers(userFilter, token);
        if (usersResponse.users) {
          setUsers(usersResponse.users);
        }

        // Fetch balance
        const balanceResponse = await getBalance(token);
        if (balanceResponse.balance !== undefined) {
          setBalance(balanceResponse.balance);
        }
      } catch (err) {
        setError("Failed to load initial data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [token, userFilter]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleTransfer = async (userId, amount) => {
    setError("");
    setSuccess("");

    if (amount > balance) {
      setError("Insufficient balance");
      return;
    }

    try {
      const response = await transferMoney({ to: userId, amount }, token);
      if (response.success) {
        setSuccess(
          `Successfully sent ₹${amount} to ${selectedUser.firstName} ${selectedUser.lastName}`
        );

        // Refresh balance
        const balanceResponse = await getBalance(token);
        if (balanceResponse.balance !== undefined) {
          setBalance(balanceResponse.balance);
        }

        // Reset form
        setSelectedUser(null);
      } else {
        setError(response.message || "Transfer failed");
      }
    } catch (err) {
      setError("An error occurred during transfer");
    }
  };

  const handleFilterChange = (e) => {
    setUserFilter(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar isAuthenticated={true} />

      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6">Send Money</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-md border border-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-md border border-green-200">
            {success}
          </div>
        )}

        <div className="mb-6">
          <p className="text-gray-800 font-medium">
            Available Balance: <span className="font-bold">₹{balance}</span>
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="userFilter"
            className="block text-sm font-medium mb-2"
          >
            Search Users
          </label>
          <input
            type="text"
            id="userFilter"
            value={userFilter}
            onChange={handleFilterChange}
            className="w-full max-w-md p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by name or email"
          />
        </div>

        {isLoading ? (
          <div className="flex flex-col md:flex-row gap-6 animate-pulse">
            <div className="w-full md:w-1/2 bg-white rounded-lg border border-gray-200 p-6 h-64">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>

            <div className="w-full md:w-1/2 bg-white rounded-lg border border-gray-200 p-6 h-64">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <UserList
                users={users}
                onSelectUser={handleSelectUser}
                selectedUserId={selectedUser?._id}
              />
            </div>

            <div className="w-full md:w-1/2">
              <TransferForm
                onTransfer={handleTransfer}
                selectedUser={selectedUser}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Send;
