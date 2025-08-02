'use client';

import React from 'react';

const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Customer', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Admin', status: 'Deactive' },
  { id: 3, name: 'Charlie Lee', email: 'charlie@example.com', role: 'Vendor', status: 'Active' },
];

export default function DeactiveUser() {
  // Filter deactive users
  const deactiveUsers = users.filter(user => user.status === 'Deactive');

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-xl font-semibold mb-4">Deactive Users</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {deactiveUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4 font-semibold text-red-600">
                  {user.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
