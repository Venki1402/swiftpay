import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import UserList from "../components/UserList";
import TransferForm from "../components/TransferForm";
import { getUsers, transferMoney, getBalance } from "../utils/api";

const Send = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Memoize the getUsers function to prevent recreating on each render
  const fetchUsers = useCallback(
    async (filter = "") => {
      try {
        const response = await getUsers(filter, token);
        return response;
      } catch (err) {
        console.error("Error fetching users:", err);
        return { users: [] };
      }
    },
    [token]
  );

  // Initial data load
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoadingInitial(true);
      try {
        // Fetch initial users without filter
        const usersResponse = await fetchUsers();
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
        setIsLoadingInitial(false);
      }
    };

    fetchInitialData();
  }, [token, fetchUsers]);

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
      if (response) {
        setSuccess(
          `Successfully sent ₹${amount} to ${selectedUser.firstName} ${selectedUser.lastName}`
        );

        // Refresh balance
        const balanceResponse = await getBalance(token);
        if (balanceResponse.balance !== undefined) {
          setBalance(balanceResponse.balance);
        }

        // Reset selection
        setSelectedUser(null);
      } else {
        setError(response.message || "Transfer failed");
      }
    } catch (err) {
      setError("An error occurred during transfer");
    }
  };

  // Success message auto-dismiss
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

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

        {isLoadingInitial ? (
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
                token={token}
                getUsers={fetchUsers}
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
