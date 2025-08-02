'use client';

import React, { useState } from 'react';

export default function UserListPage() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Customer', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Admin', status: 'Deactive' },
    { id: 3, name: 'Charlie Lee', email: 'charlie@example.com', role: 'Vendor', status: 'Active' },
  ]);

  const [editingUserId, setEditingUserId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleToggleStatus = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === 'Active' ? 'Deactive' : 'Active',
            }
          : user
      )
    );
  };

  const handleEditUser = (userId) => {
    setEditingUserId(userId);
    const userToEdit = users.find((user) => user.id === userId);
    setEditedData({ ...userToEdit });
  };

  const handleSaveUser = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editedData.id ? { ...editedData } : user
      )
    );
    setEditingUserId(null);
  };

  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-xl font-semibold mb-4">All Users</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                {editingUserId === user.id ? (
                  <>
                    <td className="py-3 px-4">
                      <input
                        name="name"
                        value={editedData.name}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        name="email"
                        value={editedData.email}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        name="role"
                        value={editedData.role}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <span className={editedData.status === 'Active' ? 'text-green-600' : 'text-red-500'}>
                        {editedData.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 space-x-2">
                      <button
                        className="text-green-600 hover:underline"
                        onClick={handleSaveUser}
                      >
                        Save
                      </button>
                      <button
                        className="text-gray-600 hover:underline"
                        onClick={() => setEditingUserId(null)}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.role}</td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        user.status === 'Active' ? 'text-green-600' : 'text-red-500'
                      }`}
                    >
                      {user.status}
                    </td>
                    <td className="py-3 px-4 space-x-2">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => handleEditUser(user.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
