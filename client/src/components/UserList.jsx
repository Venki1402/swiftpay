import React from "react";

const UserList = ({ users, onSelectUser, selectedUserId }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Select Recipient</h2>
      <div className="max-h-60 overflow-y-auto">
        {users.length === 0 ? (
          <p className="text-gray-500">No users found</p>
        ) : (
          <ul className="space-y-2">
            {users.map((user) => (
              <li
                key={user._id}
                className={`p-3 rounded-md cursor-pointer hover:bg-gray-100 transition-colors ${
                  selectedUserId === user._id
                    ? "bg-gray-100 border border-gray-300"
                    : ""
                }`}
                onClick={() => onSelectUser(user)}
              >
                <div className="font-medium">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-sm text-gray-600">{user.username}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserList;
