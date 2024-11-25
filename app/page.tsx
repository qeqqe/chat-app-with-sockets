"use client";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col bg-gradient-to-b from-gray-900 to-black">
      <div className="text-center text-white p-8 rounded-lg">
        <h1 className="text-5xl font-bold mb-4">Welcome to ChatApp</h1>
        <p className="text-xl mb-8">Connect with friends and start chatting!</p>
        <div className="space-x-4">
          <Link
            href="/login"
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-transparent text-white px-8 py-3 rounded-full font-semibold border-2 border-blue-600 hover:bg-blue-600 transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
