import React, { useState, useEffect, useCallback } from "react";

const UserList = ({ users, onSelectUser, selectedUserId, token, getUsers }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Debounce function to limit API calls
  const debounce = useCallback((fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  }, []);

  // Handle filtering (local + API)
  const handleFiltering = useCallback(
    async (filterValue) => {
      setIsLoading(true);

      // Local filtering first
      let newFilteredUsers = users;
      if (filterValue) {
        const lowercaseFilter = filterValue.toLowerCase();
        newFilteredUsers = users.filter(
          (user) =>
            user.firstName.toLowerCase().includes(lowercaseFilter) ||
            user.lastName.toLowerCase().includes(lowercaseFilter) ||
            user.username.toLowerCase().includes(lowercaseFilter)
        );
      }

      setFilteredUsers(newFilteredUsers);

      // Only fetch from API if filter exists and has minimum length
      if (filterValue && filterValue.length >= 2) {
        try {
          const response = await getUsers(filterValue, token);
          if (response?.users) {
            setFilteredUsers(response.users);
          }
        } catch (error) {
          console.error("Error fetching filtered users:", error);
        }
      }

      setIsLoading(false);
    },
    [users, getUsers, token]
  );

  // Debounced version of handleFiltering
  const debouncedHandleFiltering = useCallback(debounce(handleFiltering, 500), [
    handleFiltering,
  ]);

  // Update filter and trigger filtering
  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    debouncedHandleFiltering(newFilter);
  };

  // Initial load
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Select Recipient</h2>

      <div className="mb-4">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by name or email"
        />
      </div>

      <div className="max-h-80 overflow-y-auto">
        {isLoading ? (
          <div className="py-4 space-y-3">
            <div className="h-12 bg-gray-100 rounded-md animate-pulse"></div>
            <div className="h-12 bg-gray-100 rounded-md animate-pulse"></div>
            <div className="h-12 bg-gray-100 rounded-md animate-pulse"></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <p className="text-gray-500 py-4">No users found</p>
        ) : (
          <ul className="space-y-2">
            {filteredUsers.map((user) => (
              <li
                key={user._id}
                className={`p-3 rounded-md cursor-pointer hover:bg-gray-100 transition-colors flex justify-between ${
                  selectedUserId === user._id
                    ? "bg-gray-100 border border-gray-300"
                    : ""
                }`}
                onClick={() => onSelectUser(user)}
              >
                <div>
                  <div className="font-medium">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-sm text-gray-600">{user.username}</div>
                </div>
                <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <p className="text-2xl">
                    {user.firstName[0].toUpperCase()}
                    {user.lastName[0].toUpperCase()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserList;
