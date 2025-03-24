import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import BalanceCard from "../components/BalanceCard";
import { getBalance } from "../utils/api";

const Dashboard = ({ token, logout }) => {
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      setIsLoading(true);
      try {
        const response = await getBalance(token);
        if (response.balance !== undefined) {
          setBalance(response.balance);
        } else {
          setError("Could not fetch balance");
        }
      } catch (err) {
        setError("Failed to load balance information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar isAuthenticated={true} logout={logout} />

      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-md border border-red-200">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="w-full bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <BalanceCard balance={balance} />
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/send"
                  className="inline-flex items-center justify-center py-3 px-6 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  Send Money
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
