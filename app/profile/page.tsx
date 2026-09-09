"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const { isLoggedIn, authInitialized, user } = useAuth();
  const router = useRouter();
  const [showToken, setShowToken] = useState(false);

  if (!authInitialized) return <div>Checking session...</div>;
  if (!isLoggedIn) {
    router.replace("/login");
    return <div>Redirecting...</div>;
  }

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Profile</h1>

      {/* Profile Card */}
      <section className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-6">
        <img
          src={user?.image || "/default-avatar.png"}
          alt={user?.username}
          className="w-28 h-28 rounded-full object-cover border"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-gray-600">@{user?.username}</p>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-gray-700"><span className="font-semibold">Gender:</span> {user?.gender}</p>
          <p className="text-gray-700"><span className="font-semibold">Role:</span> {user?.role}</p>
          <p className="text-gray-700"><span className="font-semibold">User ID:</span> {user?.id}</p>

          {/* Access Token toggle */}
          <div className="mt-4">
            <button
              onClick={() => setShowToken(!showToken)}
              className="text-sm text-blue-600 hover:underline"
            >
              {showToken ? "Hide Access Token" : "Show Access Token"}
            </button>
            {showToken && (
              <p className="mt-2 text-xs break-all bg-gray-100 p-2 rounded">
                {user?.accessToken}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="flex space-x-4">
        <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
          Edit Profile
        </button>
        <button className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition">
          Logout
        </button>
      </section>

      {/* Account Settings */}
      <section className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h3 className="text-xl font-bold">Account Settings</h3>
        <button className="w-full px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition">
          Change Password
        </button>
        <button className="w-full px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition">
          Delete Account
        </button>
      </section>
    </main>
  );
}
