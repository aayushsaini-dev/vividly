import Link from "next/link";
import { LogIn, CheckCircle } from "lucide-react";

export default function SignedOutPage() {
  return (
    // Consistent background from our sign-in/sign-up pages
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 to-gray-950">
      {/* The main content card */}
      <div className="w-full max-w-md text-center bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl shadow-indigo-500/10 p-8">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-500/10 p-3 rounded-full border border-green-500/20">
            <CheckCircle className="h-10 w-10 text-green-400" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-gray-100">
          Signed Out Successfully
        </h1>
        <p className="text-md text-gray-400 mt-2">
          You have been securely logged out of your account.
        </p>

        {/* Call to Action */}
        <div className="mt-8">
          <Link href="/sign-in">
            <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500">
              <LogIn size={18} />
              Sign In Again
            </button>
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Thank you for using Cloudinary Showcase.
        </p>
      </div>
    </div>
  );
}
